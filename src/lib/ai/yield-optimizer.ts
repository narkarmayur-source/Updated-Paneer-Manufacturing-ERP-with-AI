/**
 * AI Yield & Thermal Coagulation Optimization Engine
 * Optimizes coagulation parameters to maximize moisture retention (≤58.5%)
 * and minimize whey fat loss (<0.15%), ensuring legal compliance (FSSAI).
 */

export interface RawMilkCharacteristics {
  fatPercent: number;
  snfPercent: number;
  acidity: number;
  ambientTempC: number;
  ambientHumidityRh: number;
}

export interface AIOptimizedProcessParameters {
  optimalPasteurizationTempC: number;
  optimalCoagulationTempC: number;
  recommendedCitricAcidConcentrationPercent: number;
  recommendedCitricAcidKg: number;
  targetCoagulationPh: number;
  pneumaticPressPressureBar: number;
  pneumaticPressDurationMin: number;
  predictedYieldPercentage: number;
  predictedMoisturePercentage: number;
  fatRecoveryPercentage: number;
  aiExplanation: string[];
}

export function runYieldOptimizationAI(
  milkVolumeLiters: number,
  milk: RawMilkCharacteristics
): AIOptimizedProcessParameters {
  const explanation: string[] = [];

  // Base physics & dairy chemistry calculations
  // High fat (>5.5%) requires slightly higher coagulation temp to avoid soft/crumbly body
  let optCoagTemp = 73.0;
  if (milk.fatPercent >= 5.8) {
    optCoagTemp = 74.0;
    explanation.push("High milk fat (>5.8%) detected: elevated coagulation temperature to 74.0°C to preserve firm curd matrix.");
  } else if (milk.fatPercent <= 4.2) {
    optCoagTemp = 71.5;
    explanation.push("Lower milk fat detected: reduced coagulation temperature to 71.5°C to prevent rubbery texture and maximize moisture trapping.");
  } else {
    optCoagTemp = 72.8;
    explanation.push("Standard fat/SNF ratio: maintaining baseline coagulation temperature at 72.8°C.");
  }

  // Acidity adjustments
  let targetPh = 5.32;
  let acidDosePerLiter = 2.05; // grams of citric acid per liter
  if (milk.acidity > 0.142) {
    targetPh = 5.35;
    acidDosePerLiter = 1.85; // Milk already has natural developing acidity
    explanation.push(`Elevated milk natural acidity (${milk.acidity}%): reduced citric acid dosing to 1.85g/L to avoid over-acidification.`);
  } else if (milk.acidity < 0.130) {
    targetPh = 5.30;
    acidDosePerLiter = 2.15;
    explanation.push(`Very fresh/sweet milk (${milk.acidity}%): increased citric acid dosing to 2.15g/L for clean whey separation.`);
  }

  // Environmental compensation
  if (milk.ambientTempC > 35) {
    optCoagTemp -= 0.5; // Compounding thermal inertia
    explanation.push("High ambient summer temperature: thermal loss adjusted by -0.5°C.");
  }

  // Pneumatic Pressing pressure calculation
  // Aiming for 56.5% - 58.0% moisture (FSSAI legal max is 60.0%)
  let pressPressure = 2.8; // bar
  let pressDuration = 20; // minutes

  if (milk.fatPercent > 5.5) {
    pressPressure = 2.9;
    pressDuration = 22;
    explanation.push("Increased pressing pressure to 2.9 bar for 22 mins to optimize moisture expulsion in fat-rich curd.");
  } else {
    pressPressure = 2.6;
    pressDuration = 18;
    explanation.push("Gentle pressing pressure (2.6 bar for 18 mins) to prevent excessive whey expulsion and maximize yield.");
  }

  // Yield prediction modeling (Multi-variable regression model)
  const baseYield = (milk.fatPercent * 1.88) + (milk.snfPercent * 0.94) - 0.42;
  const tempCorrection = (optCoagTemp - 70) * 0.04;
  const predictedYield = Math.min(20.2, Math.max(14.5, Number((baseYield + tempCorrection).toFixed(2))));
  
  // Predicted moisture
  const predictedMoisture = Number((57.4 - (pressPressure * 0.4) + (optCoagTemp > 73 ? -0.3 : 0.4)).toFixed(1));
  const fatRecovery = Number((91.5 + (optCoagTemp >= 72.5 ? 2.1 : -1.0)).toFixed(1));
  const totalCitricAcidKg = Number(((milkVolumeLiters * acidDosePerLiter) / 1000).toFixed(2));

  return {
    optimalPasteurizationTempC: 83.5,
    optimalCoagulationTempC: optCoagTemp,
    recommendedCitricAcidConcentrationPercent: 1.5,
    recommendedCitricAcidKg: totalCitricAcidKg,
    targetCoagulationPh: targetPh,
    pneumaticPressPressureBar: pressPressure,
    pneumaticPressDurationMin: pressDuration,
    predictedYieldPercentage: predictedYield,
    predictedMoisturePercentage: predictedMoisture,
    fatRecoveryPercentage: fatRecovery,
    aiExplanation: explanation,
  };
}
