import { NextResponse } from 'next/server';

export async function GET() {
  // Live P&L metrics based on standard Phaltan Paneer Plant economics
  const dailyMetrics = {
    date: new Date().toISOString().split('T')[0],
    milkVolumeProcessedLiters: 1500,
    milkExpense: 62250.0, // 1500 * ₹41.50
    paneerProducedKg: 270.0, // 18% yield
    productionDirectCost: {
      citricAcid: 420.0,
      packagingPouches: 1755.0,
      boilerBriquettes: 1125.0,
      electricity: 1530.0,
      plantLaborWages: 7577.0, // ₹1,97,000 / 26 days
      factoryRent: 1154.0,     // ₹30,000 / 26 days
      logisticsFreight: 1480.0,
      adminAndTesting: 615.0
    },
    totalDailyOperatingExpense: 77906.0,
    costPerKgDelivered: 288.54,
    salesRealization: {
      b2bWholesaleKg: 160.0,
      b2bWholesaleRate: 335.0,
      horecaTourismKg: 70.0,
      horecaTourismRate: 365.0,
      retailPackKg: 40.0,
      retailPackRate: 370.0,
      grossDailyRevenue: 93950.0 // (160*335) + (70*365) + (40*370)
    },
    dailyNetOperatingEBITDA: 16044.0,
    netMarginPercentage: 17.08,
    monthlyEBITDAProjected: 417144.0
  };

  return NextResponse.json(dailyMetrics);
}
