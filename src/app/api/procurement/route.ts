import { NextResponse } from 'next/server';
import { calculateMilkRate, MilkQualityInput } from '@/lib/calculations/dairy-math';

// Mock in-memory store for demo / initial state
let milkIntakes = [
  {
    id: "MI-001",
    supplierName: "Barad Dairy Farmer Producer Co.",
    village: "Barad",
    milkType: "BUFFALO",
    quantityLiters: 450,
    fatPercentage: 6.6,
    snfPercentage: 9.1,
    clr: 30.2,
    temperatureC: 4.2,
    acidityLactic: 0.135,
    ratePerLiter: 49.00,
    totalAmount: 22050,
    status: "ACCEPTED",
    timestamp: new Date().toISOString()
  },
  {
    id: "MI-002",
    supplierName: "Taradgaon BMC Hub",
    village: "Taradgaon",
    milkType: "COW",
    quantityLiters: 350,
    fatPercentage: 3.9,
    snfPercentage: 8.6,
    clr: 28.5,
    temperatureC: 4.5,
    acidityLactic: 0.138,
    ratePerLiter: 34.20,
    totalAmount: 11970,
    status: "ACCEPTED",
    timestamp: new Date().toISOString()
  }
];

export async function GET() {
  const totalLiters = milkIntakes.reduce((acc, curr) => acc + curr.quantityLiters, 0);
  const totalSpend = milkIntakes.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const avgFat = totalLiters > 0 
    ? milkIntakes.reduce((acc, curr) => acc + curr.fatPercentage * curr.quantityLiters, 0) / totalLiters 
    : 0;
  const avgRate = totalLiters > 0 ? totalSpend / totalLiters : 0;

  return NextResponse.json({
    summary: {
      totalLitersToday: totalLiters,
      totalSpendToday: totalSpend,
      averageFatPercent: Number(avgFat.toFixed(2)),
      averageRatePerLiter: Number(avgRate.toFixed(2))
    },
    intakes: milkIntakes
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const qualityInput: MilkQualityInput = {
      liters: Number(body.liters),
      fatPercent: Number(body.fatPercent),
      snfPercent: Number(body.snfPercent),
      clr: Number(body.clr),
      acidityLactic: Number(body.acidityLactic),
      temperatureC: Number(body.temperatureC)
    };

    const rateResult = calculateMilkRate(qualityInput);

    const newIntake = {
      id: `MI-${String(milkIntakes.length + 1).padStart(3, '0')}`,
      supplierName: body.supplierName || "Phaltan Milk Collection Center",
      village: body.village || "Phaltan",
      milkType: body.milkType || "MIXED_STANDARDIZED",
      quantityLiters: qualityInput.liters,
      fatPercentage: qualityInput.fatPercent,
      snfPercentage: qualityInput.snfPercent,
      clr: qualityInput.clr,
      temperatureC: qualityInput.temperatureC,
      acidityLactic: qualityInput.acidityLactic,
      ratePerLiter: rateResult.ratePerLiter,
      totalAmount: rateResult.totalGrossAmount,
      status: rateResult.isAcceptable ? "ACCEPTED" : "REJECTED",
      rejectionReasons: rateResult.rejectionReasons,
      timestamp: new Date().toISOString()
    };

    milkIntakes.unshift(newIntake);

    return NextResponse.json({
      success: true,
      data: newIntake,
      pricing: rateResult
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
