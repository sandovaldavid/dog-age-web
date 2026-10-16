import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Dog Age Web Application', () => {
  test('home page renders in English with correct metadata', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/Dog Age Calculator/);
    const heading = page.locator('h1');
    await expect(heading).toContainText('How old is your dog');
  });

  test('spanish route renders with correct localization', async ({ page }) => {
    await page.goto('./es/');
    await expect(page).toHaveTitle(/Calculadora de edad canina/);
    const heading = page.locator('h1');
    await expect(heading).toContainText('¿Qué edad tiene tu perro');
  });

  test('calculator computes correct result, updates curve and highlights milestone', async ({ page }) => {
    await page.goto('./');
    const yearsInput = page.locator('input[name="years"]');
    const monthsInput = page.locator('input[name="months"]');

    await yearsInput.fill('2');
    await monthsInput.fill('0');

    const valueEl = page.locator('.result-content .value');
    await expect(valueEl).toBeVisible();
    await expect(valueEl).toHaveText('42');

    const stageEl = page.locator('.result-content .stage');
    await expect(stageEl).toHaveText('Mature adult');

    // Milestones table has highlighted row for 2 years
    const highlightedRow = page.locator('tr[data-milestone-age="2"]');
    await expect(highlightedRow).toHaveClass(/highlight/);

    // SVG marker is displayed
    const marker = page.locator('.user-marker');
    await expect(marker).toBeVisible();
  });

  test('initializes pre-filled values from URL query parameters', async ({ page }) => {
    await page.goto('./?y=7&m=3');
    const valueEl = page.locator('.result-content .value');
    await expect(valueEl).toBeVisible();
    await expect(valueEl).toHaveText('63');
  });

  test('no horizontal overflow across viewports', async ({ page }) => {
    for (const width of [360, 820, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('./');
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    }
  });

  test('passes automated axe accessibility checks in light and dark mode', async ({ page }) => {
    await page.goto('./');
    const lightA11y = await new AxeBuilder({ page }).analyze();
    expect(lightA11y.violations).toEqual([]);

    await page.emulateMedia({ colorScheme: 'dark' });
    await page.reload();
    const darkA11y = await new AxeBuilder({ page }).analyze();
    expect(darkA11y.violations).toEqual([]);
  });

  test('has all required favicon, manifest and SEO OpenGraph assets in head', async ({ page }) => {
    await page.goto('./');
    const svgIcon = page.locator('link[rel="icon"][type="image/svg+xml"]');
    await expect(svgIcon).toHaveCount(1);

    const pngIcon = page.locator('link[rel="icon"][sizes="32x32"]');
    await expect(pngIcon).toHaveCount(1);

    const appleIcon = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleIcon).toHaveCount(1);

    const manifest = page.locator('link[rel="manifest"]');
    await expect(manifest).toHaveCount(1);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-image-en\.png$/);

    await page.goto('./es/');
    const esOgImage = page.locator('meta[property="og:image"]');
    await expect(esOgImage).toHaveAttribute('content', /og-image-es\.png$/);
  });

  test('footer contains comprehensive scientific citation and legal disclaimers', async ({ page }) => {
    await page.goto('./');
    const citation = page.locator('.citation-block');
    await expect(citation).toContainText('Wang T, Ma J');
    await expect(citation.locator('a[href*="doi.org"]')).toBeVisible();
    await expect(citation.locator('a[href*="ncbi.nlm.nih.gov/pmc"]')).toBeVisible();

    const legal = page.locator('.legal-block');
    await expect(legal).toBeVisible();
    await expect(legal).toContainText('Veterinary Notice');
    await expect(legal).toContainText('Non-Affiliation');
    await expect(legal).toContainText('Privacy Guarantee');
  });
});
