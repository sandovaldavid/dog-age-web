import { describe, expect, it } from 'vitest';
import { getCopy } from './ui';

describe('i18n copy parity', () => {
  it('milestoneLabels have equal length (7) in both languages', () => {
    expect(getCopy('en').milestoneLabels).toHaveLength(7);
    expect(getCopy('es').milestoneLabels).toHaveLength(getCopy('en').milestoneLabels.length);
  });

  it('methodParagraphs have equal count in both languages', () => {
    expect(getCopy('es').methodParagraphs).toHaveLength(getCopy('en').methodParagraphs.length);
  });
});
