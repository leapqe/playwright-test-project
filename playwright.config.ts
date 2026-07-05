import { devices, defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Root config: runs both suites (`npx playwright test [--project=ui|api]`).
// Loads env/.env.test directly, so it works without env-cmd.
dotenv.config({ path: 'env/.env.test' });

export default defineConfig({
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['dot']]
    : [['html', { open: 'never' }], ['list']],
  projects: [
    {
      name: 'ui',
      testDir: './ui-automation/tests/scenarios',
      fullyParallel: false,
      timeout: 60 * 1000 * 2, // 2 min per test
      retries: 0,
      expect: { timeout: 15 * 1000 },
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1500, height: 720 },
        actionTimeout: 15 * 1000,
        baseURL: process.env.UI_BASE_URL,
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        trace: 'on',
        video: 'on-first-retry',
        headless: false,
      },
    },
    {
      name: 'api',
      testDir: './api-automation/tests/fakerestapi/scenarios',
      fullyParallel: true,
      timeout: 60 * 1000, // 1 min per test
      retries: process.env.CI ? 1 : 0,
      use: {
        baseURL: process.env.API_BASE_URL,
        trace: 'on',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      },
    },
  ],
});
