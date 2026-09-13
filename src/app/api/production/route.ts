import { NextResponse } from 'next/server';
import { runYieldOptimizationAI } from '@/lib/ai/yield-optimizer';
import { computePaneerMassBalance } from '@/lib/calculations/dairy-math';

let productionBatches: any[] = [
  {
    id: "BATCH-20260914-01",
    batchCode: "PB-01",
    milkVolumeLiters: 750,
    blendFatPercent: 5.2,
    blendSNFPercent: 8.85,
    pasteurizationTempC: 83.5,
    coagulationTempC: 73.0,
    citricAcidKg: 1.58,
    targetPaneerKg: 138.0,
    actualPaneerKg: 139.5,
    yieldPercentage: 18.08,
    status: "COLD_STORAGE",
    timestamp: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json({
    activeBatches: productionBatches,
    totalPaneerProducedKgToday: productionBatches.reduce((acc, curr) => acc + (curr.actualPaneerKg || 0), 0)
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const milkVolume = Number(body.milkVolumeLiters || 750);
    const fat = Number(body.fatPercent || 5.0);
    const snf = Number(body.snfPercent || 8.8);
    const acidity = Number(body.acidity || 0.138);

    // AI Optimization
    const aiParams = runYieldOptimizationAI(milkVolume, {
      fatPercent: fat,
      snfPercent: snf,
      acidity: acidity,
      ambientTempC: Number(body.ambientTempC || 30.0),
      ambientHumidityRh: Number(body.ambientHumidityRh || 65.0)
    });

    const massBalance = computePaneerMassBalance(milkVolume, fat, snf);

    const newBatch = {
      id: `BATCH-${Date.now()}`,
      batchCode: `PB-${String(productionBatches.length + 1).padStart(2, '0')}`,
      milkVolumeLiters: milkVolume,
      blendFatPercent: fat,
      blendSNFPercent: snf,
      pasteurizationTempC: aiParams.optimalPasteurizationTempC,
      coagulationTempC: aiParams.optimalCoagulationTempC,
      citricAcidKg: aiParams.recommendedCitricAcidKg,
      targetPaneerKg: massBalance.expectedPaneerKg,
      actualPaneerKg: 0,
      yieldPercentage: aiParams.predictedYieldPercentage,
      status: "HEATING",
      aiInsights: aiParams.aiExplanation,
      massBalanceDetails: massBalance,
      timestamp: new Date().toISOString()
    };

    productionBatches.unshift(newBatch);

    return NextResponse.json({
      success: true,
      batch: newBatch,
      aiParameters: aiParams
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
