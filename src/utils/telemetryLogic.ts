/**
 * Telemetry and clinical evaluation pure logic functions
 */

export interface MetResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

/**
 * Format Mission Elapsed Time (MET) into NASA flight clock standard: DDD:HH:MM:SS
 */
export function formatMET(totalSeconds: number): MetResult {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(safeSeconds / 86400);
  const remainingAfterDays = safeSeconds % 86400;
  const hours = Math.floor(remainingAfterDays / 3600);
  const remainingAfterHours = remainingAfterDays % 3600;
  const minutes = Math.floor(remainingAfterHours / 60);
  const seconds = remainingAfterHours % 60;

  const pad = (n: number, width = 2) => String(n).padStart(width, '0');
  const formatted = `MET +${pad(days, 3)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return { days, hours, minutes, seconds, formatted };
}

/**
 * Evaluate Galactic Cosmic Radiation (GCR) & Solar Particle Event (SPE) dosimetry
 */
export function evaluateRadiationHazard(rateMicroSvPerHour: number, cumulativeMsv: number): {
  hazardLevel: 'nominal' | 'elevated' | 'critical';
  maxStayAllowedDays: number;
  shieldingStatus: 'nominal' | 'storm_shelter_required';
} {
  // NASA 30-day limit baseline: 250 mSv career limit depends on age/sex (~600mSv max)
  if (rateMicroSvPerHour > 100 || cumulativeMsv > 350) {
    return {
      hazardLevel: 'critical',
      maxStayAllowedDays: Math.max(1, Math.floor((600 - cumulativeMsv) / 1.5)),
      shieldingStatus: 'storm_shelter_required',
    };
  }
  if (rateMicroSvPerHour > 30 || cumulativeMsv > 150) {
    return {
      hazardLevel: 'elevated',
      maxStayAllowedDays: Math.floor((600 - cumulativeMsv) / 0.8),
      shieldingStatus: 'nominal',
    };
  }
  return {
    hazardLevel: 'nominal',
    maxStayAllowedDays: 730,
    shieldingStatus: 'nominal',
  };
}

/**
 * Evaluate SANS (Spaceflight-Associated Neuro-ocular Syndrome) risk based on optic nerve sheath diameter (ONSD)
 */
export function evaluateSansRisk(onsdMillimeters: number, intraocularPressureMmHg: number): {
  riskScore: number;
  stage: 'Stage 0 (None)' | 'Stage 1 (Mild Edema)' | 'Stage 2 (Moderate SANS)' | 'Stage 3 (Severe)';
  recommendLBNP: boolean;
} {
  if (onsdMillimeters >= 6.2 || intraocularPressureMmHg > 24) {
    return { riskScore: 88, stage: 'Stage 3 (Severe)', recommendLBNP: true };
  }
  if (onsdMillimeters >= 5.8 || intraocularPressureMmHg > 20) {
    return { riskScore: 62, stage: 'Stage 2 (Moderate SANS)', recommendLBNP: true };
  }
  if (onsdMillimeters >= 5.3 || intraocularPressureMmHg > 16) {
    return { riskScore: 34, stage: 'Stage 1 (Mild Edema)', recommendLBNP: false };
  }
  return { riskScore: 12, stage: 'Stage 0 (None)', recommendLBNP: false };
}

/**
 * Calculate relaxation score from biometric indicators (HRV in ms, breathing rate bpm)
 */
export function calculateRelaxationIndex(hrvMs: number, respirationRateBpm: number): {
  score: number;
  state: 'high_stress' | 'balanced' | 'deep_relaxation';
} {
  // Higher HRV is better parasympathetic tone. Optimal breathing ~6 bpm for resonance.
  const hrvComponent = Math.min(100, Math.max(0, (hrvMs - 20) * 1.25));
  const respComponent = Math.max(0, 100 - Math.abs(respirationRateBpm - 6) * 8);
  const combined = Math.round(hrvComponent * 0.55 + respComponent * 0.45);
  const score = Math.min(100, Math.max(10, combined));

  let state: 'high_stress' | 'balanced' | 'deep_relaxation' = 'balanced';
  if (score >= 80) state = 'deep_relaxation';
  else if (score < 45) state = 'high_stress';

  return { score, state };
}

/**
 * Calculate Artificial Gravity on Short-Radius Centrifuge:
 * A_G = omega^2 * r (in m/s^2), and converted to G-units (divided by 9.80665)
 * @param rpm Rotational speed in revolutions per minute
 * @param radiusMeters Distance from centrifuge axis to astronaut feet (m)
 */
export function calculateArtificialGravity(rpm: number, radiusMeters: number): {
  accelerationMps2: number;
  gLoad: number;
  fluidReductionPercent: number;
} {
  const safeRpm = Math.max(0, rpm);
  const safeRadius = Math.max(0.5, radiusMeters);
  const omegaRadPerSec = (safeRpm * 2 * Math.PI) / 60;
  const accelerationMps2 = Math.pow(omegaRadPerSec, 2) * safeRadius;
  const gLoad = parseFloat((accelerationMps2 / 9.80665).toFixed(2));
  // Empirically, 1G at feet reduces cephalad fluid pressure by ~32%
  const fluidReductionPercent = Math.min(50, Math.round(gLoad * 32));

  return { accelerationMps2, gLoad, fluidReductionPercent };
}

/**
 * Evaluate VO2 Max and Aerobic Capacity for Spacewalk (EVA) Readiness
 * NASA EVA safety cutoff threshold = 36.5 mL/min/kg
 */
export function evaluateVo2MaxReadiness(currentVo2Max: number): {
  isEvaQualified: boolean;
  deficitPercent: number;
  recommendHiit: boolean;
  statusText: string;
} {
  const threshold = 36.5;
  const isEvaQualified = currentVo2Max >= threshold;
  const deficitPercent = currentVo2Max < threshold
    ? parseFloat((((threshold - currentVo2Max) / threshold) * 100).toFixed(1))
    : 0;

  return {
    isEvaQualified,
    deficitPercent,
    recommendHiit: currentVo2Max < threshold,
    statusText: isEvaQualified ? 'QUALIFIED FOR EVA SPACEWALK' : 'RESTRICTED: HIIT CYCLE MANDATORY',
  };
}

/**
 * Validate Minimum Strength Ratios for ARED Resistive Equipment:
 * Deadlift must be >= 1.0x bodyweight
 * Bench press must be >= 0.7x bodyweight
 */
export function evaluateStrengthThresholds(
  bodyweightKg: number,
  deadliftKg: number,
  benchPressKg: number
): {
  deadliftRatio: number;
  benchRatio: number;
  isDeadliftCompliant: boolean;
  isBenchCompliant: boolean;
  atrophyWarning: boolean;
} {
  const safeBw = Math.max(40, bodyweightKg);
  const deadliftRatio = parseFloat((deadliftKg / safeBw).toFixed(2));
  const benchRatio = parseFloat((benchPressKg / safeBw).toFixed(2));

  const isDeadliftCompliant = deadliftRatio >= 1.0;
  const isBenchCompliant = benchRatio >= 0.7;

  return {
    deadliftRatio,
    benchRatio,
    isDeadliftCompliant,
    isBenchCompliant,
    atrophyWarning: !isDeadliftCompliant || !isBenchCompliant,
  };
}

/**
 * Acute 30-Day Blood-Forming Organs (BFO) Radiation Limit Check
 * NASA 30-day limit = 250 mGy-Eq
 */
export function evaluate30DayRadiationLimit(doseMgyEq30Day: number): {
  remainingMgyEq: number;
  percentOfLimit: number;
  isWithinSafetyLimit: boolean;
  shelterTrigger: boolean;
} {
  const limit = 250;
  const safeDose = Math.max(0, doseMgyEq30Day);
  const remainingMgyEq = Math.max(0, limit - safeDose);
  const percentOfLimit = Math.min(100, parseFloat(((safeDose / limit) * 100).toFixed(1)));

  return {
    remainingMgyEq,
    percentOfLimit,
    isWithinSafetyLimit: safeDose < limit,
    shelterTrigger: safeDose >= 200, // Warn at 80%
  };
}

/**
 * Validate astronaut login credentials
 */
export function validateAstronautAuth(emailOrId: string, password: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = emailOrId.trim();
  if (!trimmed) {
    return { valid: false, error: 'Email or Astronaut Call-Sign is required' };
  }
  if (!password || password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  return { valid: true };
}
