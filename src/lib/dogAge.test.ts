import { describe, expect, it } from 'vitest';
import { MAX_STUDY_YEARS, MIN_DOG_YEARS, calcDogAge, formatHumanYears, humanAge, lifeStage } from './dogAge';

describe('humanAge', () => {
  it.each([
    [0.15, 0.65], [1, 31], [2, 42.09], [4, 53.18],
    [7, 62.13], [12, 70.76], [16, 75.36],
  ])('f(%s) ≈ %s (paper milestones)', (input, expected) => {
    expect(humanAge(input)).toBeCloseTo(expected, 2);
  });
  it('uses natural log, not log10', () => {
    expect(humanAge(Math.E)).toBeCloseTo(16 + 31, 10);
  });
  it('rejects zero and negative input', () => {
    expect(() => humanAge(0)).toThrow(RangeError);
    expect(() => humanAge(-1)).toThrow(RangeError);
  });
});

describe('MIN_DOG_YEARS / MAX_STUDY_YEARS', () => {
  it('minimum equals 2 whole months', () => expect(MIN_DOG_YEARS).toBeCloseTo(2 / 12, 12));
  it('study ceiling is 16 years', () => expect(MAX_STUDY_YEARS).toBe(16));
});

describe('calcDogAge', () => {
  it('both fields empty → errorEmpty', () => {
    expect(calcDogAge(null, null)).toEqual({ ok: false, error: 'errorEmpty' });
    expect(calcDogAge('', '')).toEqual({ ok: false, error: 'errorEmpty' });
  });
  it('2 years → 42.09 human, inside study range', () => {
    const r = calcDogAge('2', '');
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.humanYears).toBeCloseTo(42.09, 2);
      expect(r.beyondStudyRange).toBe(false);
    }
  });
  it('2 months → valid, positive (~2.33)', () => {
    const r = calcDogAge('', '2');
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.humanYears).toBeCloseTo(2.33, 2);
  });
  it('below 2 months → errorTooYoung', () => {
    expect(calcDogAge('', '1')).toEqual({ ok: false, error: 'errorTooYoung' });
    expect(calcDogAge('0', '0')).toEqual({ ok: false, error: 'errorTooYoung' });
  });
  it('negative or malformed input → errorInvalid', () => {
    expect(calcDogAge('-1', '')).toEqual({ ok: false, error: 'errorInvalid' });
    expect(calcDogAge('abc', '')).toEqual({ ok: false, error: 'errorInvalid' });
    expect(calcDogAge('31', '')).toEqual({ ok: false, error: 'errorInvalid' });
    expect(calcDogAge('', '12')).toEqual({ ok: false, error: 'errorInvalid' });
    expect(calcDogAge('2.5', '')).toEqual({ ok: false, error: 'errorInvalid' });
  });
  it('over 16 years → computes with beyondStudyRange=true', () => {
    const r = calcDogAge('17', '');
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.beyondStudyRange).toBe(true);
      expect(r.humanYears).toBeCloseTo(16 * Math.log(17) + 31, 10);
    }
  });
  it('boundary 16y exactly → NOT beyond range', () => {
    const r = calcDogAge('16', '');
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.beyondStudyRange).toBe(false);
  });
});

describe('lifeStage (illustrative human brackets)', () => {
  it('maps human equivalents to stages', () => {
    expect(lifeStage(17.9)).toBe('puppy');
    expect(lifeStage(18)).toBe('youngAdult');
    expect(lifeStage(39.9)).toBe('youngAdult');
    expect(lifeStage(40)).toBe('matureAdult');
    expect(lifeStage(64.9)).toBe('matureAdult');
    expect(lifeStage(65)).toBe('senior');
  });
});

describe('formatHumanYears', () => {
  it('one decimal below 10, integer otherwise', () => {
    expect(formatHumanYears(2.33)).toBe('2.3');
    expect(formatHumanYears(7.96)).toBe('8.0');
    expect(formatHumanYears(42.09)).toBe('42');
    expect(formatHumanYears(75.36)).toBe('75');
  });
});
