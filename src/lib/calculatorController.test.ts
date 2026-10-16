import { describe, expect, it } from 'vitest';
import { computeCalculatorState, type ControllerOptions } from './calculatorController';

const mockCopy: ControllerOptions['copy'] = {
  resultUnit: 'human years',
  stages: {
    puppy: 'Growing puppy',
    youngAdult: 'Young adult',
    matureAdult: 'Mature adult',
    senior: 'Senior',
  },
  errors: {
    errorEmpty: 'Enter age first',
    errorInvalid: 'Invalid numbers',
    errorTooYoung: 'Too young',
  },
  srPrefix: 'Equivalent:',
  srYears: 'human years, stage:',
};

describe('computeCalculatorState', () => {
  it('returns empty status when both fields are blank', () => {
    const res = computeCalculatorState({
      years: '',
      months: '',
      copy: mockCopy,
    });
    expect(res.status).toBe('empty');
  });

  it('returns error when input is invalid or has badInput', () => {
    const badInputRes = computeCalculatorState({
      years: '',
      months: '',
      hasBadInput: true,
      copy: mockCopy,
    });
    expect(badInputRes).toEqual({
      status: 'error',
      error: 'errorInvalid',
      errorMessage: 'Invalid numbers',
    });

    const malformedRes = computeCalculatorState({
      years: 'abc',
      months: '',
      copy: mockCopy,
    });
    expect(malformedRes.status).toBe('error');
  });

  it('returns errorTooYoung when under 2 months', () => {
    const res = computeCalculatorState({
      years: '0',
      months: '1',
      copy: mockCopy,
    });
    expect(res).toEqual({
      status: 'error',
      error: 'errorTooYoung',
      errorMessage: 'Too young',
    });
  });

  it('computes success model with stage, formatting, and closest milestone', () => {
    const res = computeCalculatorState({
      years: '2',
      months: '0',
      lang: 'en',
      copy: mockCopy,
    });
    expect(res.status).toBe('success');
    if (res.status === 'success') {
      expect(res.formattedValue).toBe('42');
      expect(res.stageKey).toBe('matureAdult');
      expect(res.stageLabel).toBe('Mature adult');
      expect(res.stageCssClass).toBe('stage-mature-adult');
      expect(res.beyondStudy).toBe(false);
      expect(res.closestMilestoneAge).toBe(2);
      expect(res.closestMilestoneIndex).toBe(2);
      expect(res.srSummary).toContain('Equivalent: ~42 human years, stage: Mature adult');
    }
  });

  it('formats decimals with comma in Spanish locale', () => {
    const res = computeCalculatorState({
      years: '0',
      months: '2',
      lang: 'es',
      copy: mockCopy,
    });
    expect(res.status).toBe('success');
    if (res.status === 'success') {
      expect(res.formattedValue).toBe('2,3');
    }
  });

  it('flags beyondStudy when age exceeds 16 years', () => {
    const res = computeCalculatorState({
      years: '17',
      months: '0',
      copy: mockCopy,
    });
    expect(res.status).toBe('success');
    if (res.status === 'success') {
      expect(res.beyondStudy).toBe(true);
      expect(res.closestMilestoneAge).toBe(16);
    }
  });
});
