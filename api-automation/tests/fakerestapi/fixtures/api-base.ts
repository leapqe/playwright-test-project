import { test as base } from '@playwright/test';
import { ActivitiesController } from '@controllers/fakerestapi/activities-controller';

type ApiFixtures = {
  activitiesApi: ActivitiesController;
};

export const apiTest = base.extend<ApiFixtures>({
  activitiesApi: async ({ request }, use) => {
    await use(new ActivitiesController(request));
  },
});

export const expect = base.expect;
