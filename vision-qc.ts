/**
 * Computer Vision & Sensor-Assisted Quality Verification Engine
 * Analyzes optical inspection data and texture sensor metrics of pressed paneer blocks
 */

export interface OpticalBlockScanInput {
  blockId: string;
  surfacePorosityScore: number; // 0.0 (smooth) to 1.0 (cracked/loose)
  colorWhitenessIndex: number;  // 80 to 100 (cream/white)
  cuttingEdgeUniformityScore: number; // 0 to 100
  vacuumSealIntegrityPercent: number; // 95% to 100%
  surfaceFreeMoistureMl: number; // free water droplets
}

export interface QCValidationResult {
  blockId: string;
  grade: "GRADE_A_PREMIUM" | "GRADE_B_STANDARD" | "REJECT_REPROCESS";
  isApprovedForPackaging: boolean;
  textureAssessment: string;
  detectedDefects: string[];
  shelfLifeDaysProjected: number;
}

export function validatePaneerBlockQC(scan: OpticalBlockScanInput): QCValidationResult {
  const defects: string[] = [];

  if (scan.surfacePorosityScore > 0.45) {
    defects.push("Excessive surface fissures / porous texture detected (Check pressing pressure).");
  }

  if (scan.surfaceFreeMoistureMl > 8.0) {
    defects.push("Excessive surface water exudation (Risk of premature slimy spoilage).");
  }

  if (scan.vacuumSealIntegrityPercent < 98.0) {
    defects.push("Micro-leakage risk detected in vacuum heat seal bar seam.");
  }

  if (scan.colorWhitenessIndex < 82.0) {
    defects.push("Slight yellowish tint or uneven color distribution.");
  }

  let grade: "GRADE_A_PREMIUM" | "GRADE_B_STANDARD" | "REJECT_REPROCESS" = "GRADE_A_PREMIUM";
  let shelfLife = 16; // days

  if (defects.length === 0) {
    grade = "GRADE_A_PREMIUM";
    shelfLife = 18;
  } else if (defects.length <= 2 && scan.vacuumSealIntegrityPercent >= 98.0) {
    grade = "GRADE_B_STANDARD";
    shelfLife = 12;
  } else {
    grade = "REJECT_REPROCESS";
    shelfLife = 0;
  }

  return {
    blockId: scan.blockId,
    grade,
    isApprovedForPackaging: grade !== "REJECT_REPROCESS",
    textureAssessment: grade === "GRADE_A_PREMIUM"
      ? "Uniform dense crumb, elastic sponge resistance, zero weeping."
      : grade === "GRADE_B_STANDARD"
      ? "Minor visual blemishes, acceptable structural body for culinary cooking."
      : "Severe texture fracturing or seal defect. Divert to sweet-making/reprocess.",
    detectedDefects: defects,
    shelfLifeDaysProjected: shelfLife,
  };
}
