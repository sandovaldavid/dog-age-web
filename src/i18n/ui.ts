export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

const en = {
  htmlLang: 'en',
  siteName: 'Dog Age in Human Years',
  metaTitle: 'Dog Age Calculator — Science-Based Human Years',
  metaDescription:
    "Translate your dog's age into human years with the epigenetic formula from Wang et al. (2020). Educational and transparent — not a DNA test, not veterinary advice.",
  langToggleLabel: 'Language',
  heroTitle: 'How old is your dog in human years?',
  heroLead:
    'Forget “×7”. By DNA methylation research, a 1-year-old dog is about 31 in human years — and aging slows down from there.',
  calculatorHeading: 'Calculator',
  labelYears: 'Years',
  labelMonths: 'Months',
  resultUnit: 'human years',
  stages: {
    puppy: 'Growing puppy',
    youngAdult: 'Young adult',
    matureAdult: 'Mature adult',
    senior: 'Senior',
  },
  stagesNote:
    'Life stages are this site’s illustrative grouping of the human equivalent — not a claim of the original study.',
  msgErrorEmpty: 'Enter your dog’s age first.',
  msgErrorInvalid: 'Please use whole numbers: years 0–30, months 0–11.',
  msgErrorTooYoung: 'The study starts at 8 weeks. Please enter at least 2 months of age.',
  msgBeyondStudy:
    'Over 16 years: outside the study range (0.15–16 years, Labrador retrievers). Showing the estimate anyway.',
  noscript: 'Enable JavaScript to use the calculator.',
  milestonesHeading: 'Milestones',
  milestonesLead: 'Every value below is computed with the same formula the calculator uses.',
  tableColDog: 'Dog age',
  tableColHuman: 'Human equivalent',
  milestoneLabels: [
    '~8 weeks (0.15 y)',
    '1 year',
    '2 years',
    '4 years',
    '7 years',
    '12 years',
    '16 years',
  ],
  howHeading: 'How it works',
  formulaText: 'human_age = 16 · ln(dog_age) + 31',
  methodParagraphs: [
    'This tool applies the population-level function published by Wang et al. (2020), built from blood DNA methylation: 95 Labrador retrievers (0.1–16 years) were compared with 320 humans (1–103 years) across 54,469 shared CpG sites, and each dog was matched to the average age of the five humans with the most similar methylome.',
    'It is an analogy between life stages measured across populations — not a measurement of your individual dog, not a DNA test, and not veterinary advice. The model was fitted on Labrador retrievers; other breeds and health conditions can age differently.',
  ],
  citationTitle: 'Citation',
  citation:
    'Wang T, Ma J, Hogan AN, Fong S, Licon K, Tsui B, Kreisberg JF, Adams PD, Carvunis A-R, Bannasch DL, Ostrander EA, Ideker T. Quantitative Translation of Dog-to-Human Aging by Conserved Remodeling of the DNA Methylome. Cell Systems. 2020;11(2):176–185.e6.',
  citationDoiLabel: 'doi:10.1016/j.cels.2020.06.006',
  creditLine:
    'Educational calculator based on Wang et al., Cell Systems (2020) — UC San Diego / UC Davis / NHGRI. Not affiliated with the authors or publishers.',
  disclaimer:
    'Educational estimate using the published translation human_age = 16·ln(dog_age) + 31. Not a DNA test, not veterinary advice, not endorsed by the original authors.',
};
// ponytail: no `as const` here — it would turn EN values into literal types and
// make `const es: typeof en` unassignable for translated strings. Plain typing
// still enforces full key/value-shape parity via astro check; label counts are
// asserted in dogAge.i18n.test.ts.

const es: typeof en = {
  htmlLang: 'es',
  siteName: 'Edad de tu perro en años humanos',
  metaTitle: 'Calculadora de edad canina — años humanos con base científica',
  metaDescription:
    'Traduce la edad de tu perro a años humanos con la fórmula epigenética de Wang et al. (2020). Educativa y transparente: no es un test de ADN ni consejo veterinario.',
  langToggleLabel: 'Idioma',
  heroTitle: '¿Qué edad tiene tu perro en años humanos?',
  heroLead:
    'Olvida el “×7”. Según la investigación en metilación del ADN, un perro de 1 año equivale a unos 31 años humanos, y el ritmo se desacelera después.',
  calculatorHeading: 'Calculadora',
  labelYears: 'Años',
  labelMonths: 'Meses',
  resultUnit: 'años humanos',
  stages: {
    puppy: 'Cachorro en crecimiento',
    youngAdult: 'Adulto joven',
    matureAdult: 'Adulto maduro',
    senior: 'Senior',
  },
  stagesNote:
    'Las etapas vitales son una agrupación ilustrativa de este sitio sobre el equivalente humano, no una afirmación del estudio original.',
  msgErrorEmpty: 'Introduce primero la edad de tu perro.',
  msgErrorInvalid: 'Usa números enteros: años 0–30, meses 0–11.',
  msgErrorTooYoung: 'El estudio empieza en las 8 semanas. Introduce al menos 2 meses de edad.',
  msgBeyondStudy:
    'Más de 16 años: fuera del rango del estudio (0,15–16 años, Labrador retriever). Se muestra la estimación igualmente.',
  noscript: 'Activa JavaScript para usar la calculadora.',
  milestonesHeading: 'Hitos',
  milestonesLead: 'Cada valor se calcula con la misma fórmula que usa la calculadora.',
  tableColDog: 'Edad del perro',
  tableColHuman: 'Equivalente humano',
  milestoneLabels: ['~8 semanas (0,15 a)', '1 año', '2 años', '4 años', '7 años', '12 años', '16 años'],
  howHeading: 'Cómo funciona',
  formulaText: 'edad_humana = 16 · ln(edad_perro) + 31',
  methodParagraphs: [
    'Esta herramienta aplica la función poblacional publicada por Wang et al. (2020), construida a partir de la metilación del ADN en sangre: se compararon 95 Labrador retrievers (0,1–16 años) con 320 humanos (1–103 años) en 54.469 sitios CpG compartidos, emparejando cada perro con la edad media de los cinco humanos de metiloma más parecido.',
    'Es una analogía entre etapas de vida medidas en poblaciones: no mide a tu perro individual, no es un test de ADN ni consejo veterinario. El modelo se ajustó sobre Labrador retrievers; otras razas y estados de salud pueden envejecer distinto.',
  ],
  citationTitle: 'Cita',
  citation:
    'Wang T, Ma J, Hogan AN, Fong S, Licon K, Tsui B, Kreisberg JF, Adams PD, Carvunis A-R, Bannasch DL, Ostrander EA, Ideker T. Quantitative Translation of Dog-to-Human Aging by Conserved Remodeling of the DNA Methylome. Cell Systems. 2020;11(2):176–185.e6.',
  citationDoiLabel: 'doi:10.1016/j.cels.2020.06.006',
  creditLine:
    'Calculadora educativa basada en Wang et al., Cell Systems (2020) — UC San Diego / UC Davis / NHGRI. Sin afiliación con los autores o las revistas.',
  disclaimer:
    'Esta herramienta aplica la función logarítmica publicada por Wang et al. (2020) a la edad cronológica que indicas. No analiza el ADN de tu perro. El estudio se hizo sobre Labrador retrievers de 0,1 a 16 años; otras razas, tamaños y estados de salud pueden envejecer distinto. El resultado es una analogía epigenética de etapas de vida, no un diagnóstico, pronóstico ni plan de tratamiento. Consulta a un veterinario para decisiones de salud.',
};

const translations = { en, es };

export function getCopy<T extends Language>(lang: T) {
  return translations[lang];
}
