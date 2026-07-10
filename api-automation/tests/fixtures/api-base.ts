import { test as base } from '@playwright/test';
import { ActivitiesController } from '@controllers/fakerestapi/activities-controller';
import { UsersController } from '@controllers/crudcrudapi/users-controller';


type ApiFixtures = {
  activitiesApi: ActivitiesController;
  usersApi: UsersController;
};

export const apiTest = base.extend<ApiFixtures>({
  activitiesApi: async ({ request }, use) => {
    await use(new ActivitiesController(request));
  },
  usersApi: async ({ request }, use) => {
    await use(new UsersController(request));
  }
});

export const expect = base.expect;
