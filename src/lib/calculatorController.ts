import {
  calcDogAge,
  findClosestMilestoneIndex,
  formatHumanYears,
  lifeStage,
  type CalcError,
  type LifeStage,
} from './dogAge';

export interface CalculatorStateEmpty {
  status: 'empty';
}

export interface CalculatorStateError {
  status: 'error';
  error: CalcError;
  errorMessage: string;
}

export interface CalculatorStateSuccess {
  status: 'success';
  dogYears: number;
  humanYears: number;
  formattedValue: string;
  stageKey: LifeStage;
  stageLabel: string;
  stageCssClass: string;
  beyondStudy: boolean;
  closestMilestoneIndex: number;
  closestMilestoneAge: number;
  srSummary: string;
}

export type CalculatorViewModel =
  | CalculatorStateEmpty
  | CalculatorStateError
  | CalculatorStateSuccess;

export interface ControllerOptions {
  years: string | null;
  months: string | null;
  hasBadInput?: boolean;
  lang?: string;
  milestones?: readonly number[];
  copy: {
    resultUnit: string;
    stages: Record<LifeStage, string>;
    errors: Record<CalcError, string>;
    srPrefix: string;
    srYears: string;
  };
}

export const MILESTONE_AGES: readonly number[] = [0.15, 1, 2, 4, 7, 12, 16];

export function computeCalculatorState(options: ControllerOptions): CalculatorViewModel {
  const { years, months, hasBadInput, lang = 'en', copy } = options;
  const milestones = options.milestones ?? MILESTONE_AGES;

  const yearsBlank = years === null || years.trim() === '';
  const monthsBlank = months === null || months.trim() === '';

  if (yearsBlank && monthsBlank && !hasBadInput) {
    return { status: 'empty' };
  }

  const outcome = calcDogAge(years, months, { badInput: hasBadInput });

  if (!outcome.ok) {
    return {
      status: 'error',
      error: outcome.error,
      errorMessage: copy.errors[outcome.error],
    };
  }

  const stage = lifeStage(outcome.humanYears);
  const formattedValue = formatHumanYears(outcome.humanYears, lang);
  const stageLabel = copy.stages[stage];
  const stageCssClass = `stage-${stage.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;

  const closestIdx = findClosestMilestoneIndex(outcome.dogYears, milestones);
  const closestAge = closestIdx >= 0 ? milestones[closestIdx] : outcome.dogYears;

  const srSummary = `${copy.srPrefix} ~${formattedValue} ${copy.srYears} ${stageLabel}`;

  return {
    status: 'success',
    dogYears: outcome.dogYears,
    humanYears: outcome.humanYears,
    formattedValue,
    stageKey: stage,
    stageLabel,
    stageCssClass,
    beyondStudy: outcome.beyondStudyRange,
    closestMilestoneIndex: closestIdx,
    closestMilestoneAge: closestAge,
    srSummary,
  };
}
