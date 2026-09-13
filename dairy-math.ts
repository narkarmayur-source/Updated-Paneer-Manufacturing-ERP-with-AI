/**
 * Dairy Mathematical & Engineering Calculation Engine
 * Designed for Phaltan Paneer Plant (Satara District, Maharashtra)
 */

export interface MilkQualityInput {
  liters: number;
  fatPercent: number;
  snfPercent: number;
  clr: number;
  acidityLactic: number;
  temperatureC: number;
}

export interface MilkPricingOutput {
  ratePerLiter: number;
  totalGrossAmount: number;
  isAcceptable: boolean;
  rejectionReasons: string[];
}

export interface PaneerMassBalance {
  inputMilkLiters: number;
  inputMilkMassKg: number;
  targetYieldPercent: number;
  expectedPaneerKg: number;
  expectedWheyLiters: number;
  citricAcidRequiredKg: number;
  steamRequiredKg: number;
  coolingWaterRequiredLiters: number;
}

/**
 * Calculates raw milk purchase rate based on standard Maharashtra 2-axis formula.
 * Standard Baseline:
 * Buffalo: 6.5% Fat, 9.0% SNF -> ~₹48.00 / Liter
 * Cow: 3.8% Fat, 8.5% SNF -> ~₹33.00 / Liter
 * Blended 60:40: 5.0% Fat, 8.8% SNF -> ~₹41.50 / Liter
 */
export function calculateMilkRate(input: MilkQualityInput): MilkPricingOutput {
  const rejectionReasons: string[] = [];

  // Strict Dockside Rejection Thresholds
  if (input.temperatureC > 10.0) {
    rejectionReasons.push(`High dock temperature: ${input.temperatureC.toFixed(1)}°C (Limit: 10.0°C)`);
  }
  if (input.acidityLactic > 0.15) {
    rejectionReasons.push(`High titratable acidity: ${input.acidityLactic.toFixed(3)}% (Limit: 0.150%)`);
  }
  if (input.fatPercent < 3.2) {
    rejectionReasons.push(`Fat below minimum legal threshold: ${input.fatPercent.toFixed(1)}%`);
  }
  if (input.snfPercent < 8.0) {
    rejectionReasons.push(`SNF below minimum legal threshold: ${input.snfPercent.toFixed(1)}%`);
  }

  // Two-Axis Pricing Component:
  // Base fat rate: ₹5.60 per 1.0% Fat per liter
  // Base SNF rate: ₹1.55 per 1.0% SNF per liter
  const fatComponent = input.fatPercent * 5.60;
  const snfComponent = input.snfPercent * 1.55;
  const baseRate = fatComponent + snfComponent;

  // Temperature & Freshness Premium / Penalty
  let adjustment = 0;
  if (input.temperatureC <= 4.5) {
    adjustment += 0.50; // Chilled milk incentive
  } else if (input.temperatureC > 7.5) {
    adjustment -= 0.75; // Handling deduction for elevated temperature
  }

  const finalRate = Math.max(25.0, Number((baseRate + adjustment).toFixed(2)));
  const totalGrossAmount = Number((finalRate * input.liters).toFixed(2));

  return {
    ratePerLiter: finalRate,
    totalGrossAmount,
    isAcceptable: rejectionReasons.length === 0,
    rejectionReasons,
  };
}

/**
 * Computes exact mass-balance for a paneer batch
 * Average density of standardized milk: 1.030 kg/L
 */
export function computePaneerMassBalance(
  milkLiters: number,
  fatPercent: number,
  snfPercent: number
): PaneerMassBalance {
  const milkMassKg = milkLiters * 1.030;

  // Yield Formula (NDDB / Dairy Science Standard):
  // Buffalo/Cow blend yield is driven predominantly by total solids: Fat + Casein
  // Empirical formula: Yield % = (Fat % * 1.85) + (SNF % * 0.95) - 0.5 (process whey losses)
  const calculatedYieldPercent = Math.min(
    20.5,
    Math.max(14.0, Number(((fatPercent * 1.85) + (snfPercent * 0.95) - 0.45).toFixed(2)))
  );

  const expectedPaneerKg = Number(((milkMassKg * calculatedYieldPercent) / 100).toFixed(1));
  const expectedWheyLiters = Number(((milkMassKg - expectedPaneerKg) / 1.022).toFixed(1)); // Whey density ~1.022

  // Coagulant ratio: 2.0g to 2.2g food-grade citric acid per liter of milk
  const citricAcidRequiredKg = Number(((milkLiters * 2.1) / 1000).toFixed(2));

  // Steam requirement to heat from 4°C to 85°C:
  // Q = m * Cp * deltaT = milkMass * 3.93 kJ/kg.C * 81 C
  // Approx 0.093 kg steam per liter of milk
  const steamRequiredKg = Number((milkLiters * 0.093).toFixed(1));

  // Chilled immersion water: 2.5 Liters of water per kg of paneer
  const coolingWaterRequiredLiters = Number((expectedPaneerKg * 2.5).toFixed(0));

  return {
    inputMilkLiters: milkLiters,
    inputMilkMassKg: Number(milkMassKg.toFixed(1)),
    targetYieldPercent: calculatedYieldPercent,
    expectedPaneerKg,
    expectedWheyLiters,
    citricAcidRequiredKg,
    steamRequiredKg,
    coolingWaterRequiredLiters,
  };
}

/**
 * Computes Dynamic Cost per kg of Finished Paneer
 */
export interface BatchCostInput {
  milkVolumeLiters: number;
  milkDeliveredCost: number;
  actualPaneerKg: number;
  citricAcidCost: number;
  packagingUnitCost: number;
  dailyLaborCost: number;
  dailyElectricityCost: number;
  dailyFuelCost: number;
  dailyRentAndOverhead: number;
  freightCostPerKg: number;
}

export function calculateCostPerKg(costs: BatchCostInput): {
  costPerKg: number;
  breakdown: Record<string, number>;
} {
  const kg = Math.max(1, costs.actualPaneerKg);
  const milkPerKg = costs.milkDeliveredCost / kg;
  const coagulantPerKg = costs.citricAcidCost / kg;
  const packagingPerKg = costs.packagingUnitCost;
  const laborPerKg = costs.dailyLaborCost / kg;
  const powerPerKg = costs.dailyElectricityCost / kg;
  const boilerFuelPerKg = costs.dailyFuelCost / kg;
  const rentOverheadPerKg = costs.dailyRentAndOverhead / kg;
  const freightPerKg = costs.freightCostPerKg;

  const totalCostPerKg = Number(
    (
      milkPerKg +
      coagulantPerKg +
      packagingPerKg +
      laborPerKg +
      powerPerKg +
      boilerFuelPerKg +
      rentOverheadPerKg +
      freightPerKg
    ).toFixed(2)
  );

  return {
    costPerKg: totalCostPerKg,
    breakdown: {
      milk: Number(milkPerKg.toFixed(2)),
      coagulant: Number(coagulantPerKg.toFixed(2)),
      packaging: Number(packagingPerKg.toFixed(2)),
      labor: Number(laborPerKg.toFixed(2)),
      electricity: Number(powerPerKg.toFixed(2)),
      boilerFuel: Number(boilerFuelPerKg.toFixed(2)),
      rentAndOverhead: Number(rentOverheadPerKg.toFixed(2)),
      logistics: Number(freightPerKg.toFixed(2)),
    },
  };
}
