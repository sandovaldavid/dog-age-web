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
    'Forget “×7”. According to DNA methylation research, a 1-year-old dog is about 31 in human years — and aging slows down from there.',
  calculatorHeading: 'Calculator',
  fieldgroupLegend: 'Dog age in years and months',
  labelYears: 'Years',
  labelMonths: 'Months',
  placeholderYears: 'e.g. 2',
  placeholderMonths: '0–11',
  resultPrompt: 'Enter your dog’s age above to calculate their human equivalent.',
  resultUnit: 'human years',
  vetNotice: 'Educational estimate — not veterinary advice.',
  srResultPrefix: 'Human equivalent: about',
  srResultYears: 'human years, stage:',
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
    'Over 16 years: outside the study range (0.1–16 years, Labrador retrievers). Showing the estimate anyway.',
  noscript: 'Enable JavaScript to use the interactive calculator.',
  milestonesHeading: 'Milestones & “×7” Comparison',
  milestonesLead: 'Comparison between the published epigenetic formula and the traditional multiplier.',
  tableColDog: 'Dog age',
  tableColEpigenetic: 'Epigenetic formula',
  tableColLinear: 'Traditional “×7”',
  milestoneLabels: [
    '~8 weeks (0.15 y)',
    '1 year',
    '2 years',
    '4 years',
    '7 years',
    '12 years',
    '16 years',
  ],
  milestonesFootnote:
    'The study fitted a logarithmic curve across 95 Labrador retrievers (0.1–16 years). The 8-week point corresponds to ~0.15 years.',
  comparisonTitle: 'Aging Curve Comparison',
  comparisonAriaLabel: 'Chart comparing epigenetic curve with 7x linear multiplier',
  curveLegendEpigenetic: 'Epigenetic formula (Wang et al. 2020)',
  curveLegendLinear: 'Traditional ×7 multiplier',
  curveYourDog: 'Your dog',
  shareBtn: 'Share result',
  shareCopied: 'Link copied to clipboard!',
  howHeading: 'How it works',
  formulaText: 'human_age = 16 · ln(dog_age) + 31',
  methodParagraphs: [
    'This tool applies the population-level function published by Wang et al. (2020) in Cell Systems, built from blood DNA methylation: 95 Labrador retrievers (0.1–16 years) were compared with 320 humans (1–103 years) across 54,469 shared CpG sites, and each dog was matched to the average age of the five humans with the most similar methylome.',
    'It is an analogy between life stages measured across populations — not a measurement of your individual dog, not a DNA test, and not veterinary advice. The model was fitted on Labrador retrievers; other breeds and health conditions can age differently.',
  ],
  citationTitle: 'Citation',
  citation:
    'Wang T, Ma J, Hogan AN, Fong S, Licon K, Tsui B, Kreisberg JF, Adams PD, Carvunis A-R, Bannasch DL, Ostrander EA, Ideker T. Quantitative Translation of Dog-to-Human Aging by Conserved Remodeling of the DNA Methylome. Cell Systems. 2020;11(2):176–185.e6.',
  citationDoiLabel: 'doi:10.1016/j.cels.2020.06.006',
  creditLine:
    'Educational calculator based on Wang et al., Cell Systems (2020) — UC San Diego / UC Davis / NHGRI. Not affiliated with the authors or publishers.',
  authorBy: 'Created by',
  authorName: 'David Sandoval',
  authorUrl: 'https://hub.sandovaldavid.com',
  repoLabel: 'Source code on GitHub',
  repoUrl: 'https://github.com/sandovaldavid/dog-age-web',
  disclaimer:
    'This tool applies the logarithmic function published by Wang et al. (2020) to the chronological age you enter. It does not analyze your dog’s DNA. The study was conducted on Labrador retrievers aged 0.1 to 16 years; other breeds, sizes, and health states may age differently. The result is an epigenetic analogy of life stages, not a veterinary diagnosis, prognosis, or treatment plan. Consult a veterinarian for health decisions.',
};

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
  fieldgroupLegend: 'Edad del perro en años y meses',
  labelYears: 'Años',
  labelMonths: 'Meses',
  placeholderYears: 'ej. 2',
  placeholderMonths: '0–11',
  resultPrompt: 'Introduce la edad de tu perro arriba para calcular su equivalente humano.',
  resultUnit: 'años humanos',
  vetNotice: 'Estimación educativa — no es consejo veterinario.',
  srResultPrefix: 'Equivalente humano: aproximadamente',
  srResultYears: 'años humanos, etapa:',
  stages: {
    puppy: 'Cachorro en crecimiento',
    youngAdult: 'Adulto joven',
    matureAdult: 'Adulto maduro',
    senior: 'Sénior',
  },
  stagesNote:
    'Las etapas vitales son una agrupación ilustrativa de este sitio sobre el equivalente humano, no una afirmación del estudio original.',
  msgErrorEmpty: 'Introduce primero la edad de tu perro.',
  msgErrorInvalid: 'Usa números enteros: años 0–30, meses 0–11.',
  msgErrorTooYoung: 'El estudio empieza en las 8 semanas. Introduce al menos 2 meses de edad.',
  msgBeyondStudy:
    'Más de 16 años: fuera del rango del estudio (0,1–16 años, Labrador retriever). Se muestra la estimación igualmente.',
  noscript: 'Activa JavaScript para usar la calculadora interactiva.',
  milestonesHeading: 'Hitos y comparación con “×7”',
  milestonesLead: 'Comparación entre la fórmula epigenética publicada y la regla multiplicativa tradicional.',
  tableColDog: 'Edad del perro',
  tableColEpigenetic: 'Fórmula epigenética',
  tableColLinear: 'Regla tradicional “×7”',
  milestoneLabels: [
    '~8 semanas (0,15 a)',
    '1 año',
    '2 años',
    '4 años',
    '7 años',
    '12 años',
    '16 años',
  ],
  milestonesFootnote:
    'El estudio ajustó una curva logarítmica sobre 95 Labrador retrievers (0,1–16 años). El punto de 8 semanas corresponde a ~0,15 años.',
  comparisonTitle: 'Curva comparativa de envejecimiento',
  comparisonAriaLabel: 'Gráfico comparando la curva epigenética con la regla de multiplicar por 7',
  curveLegendEpigenetic: 'Fórmula epigenética (Wang et al. 2020)',
  curveLegendLinear: 'Regla tradicional ×7',
  curveYourDog: 'Tu perro',
  shareBtn: 'Compartir resultado',
  shareCopied: '¡Enlace copiado al portapapeles!',
  howHeading: 'Cómo funciona',
  formulaText: 'edad_humana = 16 · ln(edad_perro) + 31',
  methodParagraphs: [
    'Esta herramienta aplica la función poblacional publicada por Wang et al. (2020) en Cell Systems, construida a partir de la metilación del ADN en sangre: se compararon 95 Labrador retrievers (0,1–16 años) con 320 humanos (1–103 años) en 54.469 sitios CpG compartidos, emparejando cada perro con la edad media de los cinco humanos de metiloma más parecido.',
    'Es una analogía entre etapas de vida medidas en poblaciones: no mide a tu perro individual, no es un test de ADN ni consejo veterinario. El modelo se ajustó sobre Labrador retrievers; otras razas y estados de salud pueden envejecer distinto.',
  ],
  citationTitle: 'Cita',
  citation:
    'Wang T, Ma J, Hogan AN, Fong S, Licon K, Tsui B, Kreisberg JF, Adams PD, Carvunis A-R, Bannasch DL, Ostrander EA, Ideker T. Quantitative Translation of Dog-to-Human Aging by Conserved Remodeling of the DNA Methylome. Cell Systems. 2020;11(2):176–185.e6.',
  citationDoiLabel: 'doi:10.1016/j.cels.2020.06.006',
  creditLine:
    'Calculadora educativa basada en Wang et al., Cell Systems (2020) — UC San Diego / UC Davis / NHGRI. Sin afiliación con los autores o las revistas.',
  authorBy: 'Creado por',
  authorName: 'David Sandoval',
  authorUrl: 'https://hub.sandovaldavid.com',
  repoLabel: 'Código fuente en GitHub',
  repoUrl: 'https://github.com/sandovaldavid/dog-age-web',
  disclaimer:
    'Esta herramienta aplica la función logarítmica publicada por Wang et al. (2020) a la edad cronológica que indicas. No analiza el ADN de tu perro. El estudio se hizo sobre Labrador retrievers de 0,1 a 16 años; otras razas, tamaños y estados de salud pueden envejecer distinto. El resultado es una analogía epigenética de etapas de vida, no un diagnóstico, pronóstico ni plan de tratamiento. Consulta a un veterinario para decisiones de salud.',
};

const translations = { en, es };

export function getCopy<T extends Language>(lang: T) {
  return translations[lang];
}

