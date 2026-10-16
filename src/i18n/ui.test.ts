import { describe, expect, it } from 'vitest';
import { getCopy } from './ui';

describe('i18n copy parity', () => {
  const en = getCopy('en');
  const es = getCopy('es');

  it('has identical top-level keys in both languages', () => {
    const enKeys = Object.keys(en).sort();
    const esKeys = Object.keys(es).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it('has identical life stages keys in both languages', () => {
    expect(Object.keys(es.stages).sort()).toEqual(Object.keys(en.stages).sort());
  });

  it('milestoneLabels have equal length (7) in both languages', () => {
    expect(en.milestoneLabels).toHaveLength(7);
    expect(es.milestoneLabels).toHaveLength(en.milestoneLabels.length);
  });

  it('methodParagraphs have equal count in both languages', () => {
    expect(es.methodParagraphs).toHaveLength(en.methodParagraphs.length);
  });

  it('contains no empty strings in either language catalog', () => {
    const checkEmpty = (obj: Record<string, unknown>, path = '') => {
      for (const [key, val] of Object.entries(obj)) {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof val === 'string') {
          expect(val.trim().length, `Empty string at ${fullPath}`).toBeGreaterThan(0);
        } else if (Array.isArray(val)) {
          val.forEach((item, idx) => {
            if (typeof item === 'string') {
              expect(item.trim().length, `Empty string at ${fullPath}[${idx}]`).toBeGreaterThan(0);
            }
          });
        } else if (typeof val === 'object' && val !== null) {
          checkEmpty(val as Record<string, unknown>, fullPath);
        }
      }
    };
    checkEmpty(en, 'en');
    checkEmpty(es, 'es');
  });
});

