/** Single source of truth for the published translation (Wang et al. 2020):
 *  human_age = 16 · ln(dog_age) + 31   (natural log). */

export const MIN_DOG_YEARS = 2 / 12; // 2 whole months: smallest expressible ≥ 8 weeks
export const MAX_STUDY_YEARS = 16; // study fitted on Labradors aged 0.1–16 y

export function humanAge(dogYears: number): number {
  if (!(dogYears > 0)) throw new RangeError('dog_age must be > 0');
  return 16 * Math.log(dogYears) + 31;
}

export type LifeStage = 'puppy' | 'youngAdult' | 'matureAdult' | 'senior';

/** Illustrative brackets over the HUMAN equivalent — our grouping, not a paper claim. */
export function lifeStage(humanYears: number): LifeStage {
  if (humanYears < 18) return 'puppy';
  if (humanYears < 40) return 'youngAdult';
  if (humanYears < 65) return 'matureAdult';
  return 'senior';
}

export function formatHumanYears(humanYears: number, locale: string = 'en'): string {
  const rounded = humanYears < 10
    ? Math.round(humanYears * 10) / 10
    : Math.round(humanYears);
  return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    minimumFractionDigits: humanYears < 10 ? 1 : 0,
    maximumFractionDigits: humanYears < 10 ? 1 : 0,
  }).format(rounded);
}

export type CalcError = 'errorEmpty' | 'errorInvalid' | 'errorTooYoung';

export type CalcResult =
  | { ok: true; dogYears: number; humanYears: number; beyondStudyRange: boolean }
  | { ok: false; error: CalcError };

export function traditionalAge(dogYears: number): number {
  return dogYears * 7;
}

export function findClosestMilestoneIndex(dogYears: number, milestones: readonly number[]): number {
  if (milestones.length === 0) return -1;
  let closestIndex = 0;
  let minDiff = Math.abs(dogYears - milestones[0]);
  for (let i = 1; i < milestones.length; i++) {
    const diff = Math.abs(dogYears - milestones[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }
  return closestIndex;
}

function parseField(raw: string | null, max: number): number | 'invalid' {
  if (raw === null || raw.trim() === '') return 0;
  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0 || n > max) return 'invalid';
  return n;
}

export function calcDogAge(
  yearsRaw: string | null,
  monthsRaw: string | null,
  options?: { badInput?: boolean }
): CalcResult {
  if (options?.badInput) return { ok: false, error: 'errorInvalid' };
  const yearsBlank = yearsRaw === null || yearsRaw.trim() === '';
  const monthsBlank = monthsRaw === null || monthsRaw.trim() === '';
  if (yearsBlank && monthsBlank) return { ok: false, error: 'errorEmpty' };
  const y = parseField(yearsRaw, 30);
  const m = parseField(monthsRaw, 11);
  if (y === 'invalid' || m === 'invalid') return { ok: false, error: 'errorInvalid' };
  const dogYears = y + m / 12;
  if (dogYears < MIN_DOG_YEARS) return { ok: false, error: 'errorTooYoung' };
  const humanYears = humanAge(dogYears);
  return { ok: true, dogYears, humanYears, beyondStudyRange: dogYears > MAX_STUDY_YEARS };
}

