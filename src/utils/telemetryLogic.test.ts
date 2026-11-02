import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatMET,
  evaluateRadiationHazard,
  evaluateSansRisk,
  calculateRelaxationIndex,
  validateAstronautAuth,
  calculateArtificialGravity,
  evaluateVo2MaxReadiness,
  evaluateStrengthThresholds,
  evaluate30DayRadiationLimit,
} from './telemetryLogic';

test('formatMET formats time into NASA flight format', () => {
  const res = formatMET(90065); // 1 day, 1 hour, 1 min, 5 sec
  assert.equal(res.days, 1);
  assert.equal(res.hours, 1);
  assert.equal(res.minutes, 1);
  assert.equal(res.seconds, 5);
  assert.equal(res.formatted, 'MET +001:01:01:05');
});

test('evaluateRadiationHazard flags elevated and critical radiation limits', () => {
  const nominal = evaluateRadiationHazard(18.2, 120);
  assert.equal(nominal.hazardLevel, 'nominal');
  assert.equal(nominal.shieldingStatus, 'nominal');

  const elevated = evaluateRadiationHazard(45, 180);
  assert.equal(elevated.hazardLevel, 'elevated');

  const critical = evaluateRadiationHazard(120, 360);
  assert.equal(critical.hazardLevel, 'critical');
  assert.equal(critical.shieldingStatus, 'storm_shelter_required');
});

test('evaluateSansRisk recommends LBNP countermeasure when sheath diameter is elevated', () => {
  const low = evaluateSansRisk(4.9, 14);
  assert.equal(low.recommendLBNP, false);

  const severe = evaluateSansRisk(6.4, 25);
  assert.equal(severe.recommendLBNP, true);
  assert.equal(severe.stage, 'Stage 3 (Severe)');
});

test('calculateRelaxationIndex scales with HRV and breathing rate', () => {
  const relaxed = calculateRelaxationIndex(85, 6);
  assert.equal(relaxed.state, 'deep_relaxation');
  assert.ok(relaxed.score >= 80);

  const stressed = calculateRelaxationIndex(22, 22);
  assert.equal(stressed.state, 'high_stress');
  assert.ok(stressed.score < 45);
});

test('validateAstronautAuth validates input credentials', () => {
  assert.equal(validateAstronautAuth('', 'password123').valid, false);
  assert.equal(validateAstronautAuth('cmdr.vance', '123').valid, false);
  assert.equal(validateAstronautAuth('alex.vance@remontada.space', 'astronaut123').valid, true);
});

test('calculateArtificialGravity calculates feet g-load correctly', () => {
  // 30 RPM at 2 meters radius: omega = 30 * 2pi / 60 = pi rad/s. A = pi^2 * 2 ~ 19.74 m/s^2 ~ 2.01G
  const ag = calculateArtificialGravity(30, 2);
  assert.ok(ag.gLoad > 1.9 && ag.gLoad < 2.1);
  assert.ok(ag.fluidReductionPercent >= 30);
});

test('evaluateVo2MaxReadiness flags below-threshold EVA restriction', () => {
  const passing = evaluateVo2MaxReadiness(42);
  assert.equal(passing.isEvaQualified, true);
  assert.equal(passing.recommendHiit, false);

  const failing = evaluateVo2MaxReadiness(34);
  assert.equal(failing.isEvaQualified, false);
  assert.equal(failing.recommendHiit, true);
  assert.ok(failing.deficitPercent > 0);
});

test('evaluateStrengthThresholds enforces 1.0x and 0.7x bodyweight ratios', () => {
  // 80kg astronaut: deadlift 120kg (1.5x), bench 65kg (0.81x) -> compliant
  const compliant = evaluateStrengthThresholds(80, 120, 65);
  assert.equal(compliant.atrophyWarning, false);

  // 80kg astronaut: deadlift 70kg (0.875x) -> fails deadlift threshold
  const failing = evaluateStrengthThresholds(80, 70, 65);
  assert.equal(failing.atrophyWarning, true);
  assert.equal(failing.isDeadliftCompliant, false);
});

test('evaluate30DayRadiationLimit warns when approaching 250 mGy-Eq limit', () => {
  const safe = evaluate30DayRadiationLimit(85);
  assert.equal(safe.isWithinSafetyLimit, true);
  assert.equal(safe.shelterTrigger, false);

  const warning = evaluate30DayRadiationLimit(210);
  assert.equal(warning.isWithinSafetyLimit, true);
  assert.equal(warning.shelterTrigger, true); // Warn at 80%
});
