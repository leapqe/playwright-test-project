import { test as base } from '@playwright/test';
import { ActivitiesController } from '@controllers/fakerestapi/activities-controller';
import { UserApiController } from '@controllers/crudcrud/crudcrud-users-controller';

type ApiFixtures = {
  activitiesApi: ActivitiesController;
  userApi: UserApiController
};

export const apiTest = base.extend<ApiFixtures>({
  activitiesApi: async ({ request }, use) => {
    await use(new ActivitiesController(request));
  },
  userApi: async ({ request }, use) => {
    await use(new UserApiController(request));
  },
});

export const expect = base.expect;
