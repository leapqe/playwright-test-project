import { devices, defineConfig } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config();

export default defineConfig({
  testDir: './scenarios',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  timeout: 60 * 1000 * 2, // 2 min per test
  retries: 0,
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['dot']]
    : [['html', { open: 'never' }], ['list']],
  expect: {
    timeout: 15 * 1000,
  },
  use: {
    actionTimeout: 15 * 1000,
    baseURL: process.env.UI_BASE_URL,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on',
    video: 'on-first-retry',
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1500, height: 720 },
      },
    },
  ],
});
