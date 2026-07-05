import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment selected via env-cmd.
dotenv.config();

export default defineConfig({
  testDir: './scenarios',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  timeout: 60 * 1000, // 1 min per test
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['dot']]
    : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.API_BASE_URL,
    trace: 'on',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
  projects: [
    {
      name: 'fakerestapi',
    },
  ],
});
