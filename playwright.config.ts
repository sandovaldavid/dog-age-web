import process from 'node:process';
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4399/dog-age-web/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(process.env.CI ? {} : { channel: 'chrome' }),
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 5'],
        ...(process.env.CI ? {} : { channel: 'chrome' }),
      },
    },
  ],


  webServer: {
    command: 'npx astro preview --port 4399 --host 127.0.0.1',
    url: 'http://127.0.0.1:4399/dog-age-web/',
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },


});
