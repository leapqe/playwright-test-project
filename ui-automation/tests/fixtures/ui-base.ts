import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LogInModal } from '../../pages/login.modal';
import { SignUpModal } from '../../pages/signup.modal';

type UiFixtures = {
  homePage: HomePage;
  logInModal: LogInModal;
  signUpModal: SignUpModal;
};

export const uiTest = base.extend<UiFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  logInModal: async ({ page }, use) => {
    await use(new LogInModal(page));
  },
  signUpModal: async ({ page }, use) => {
    await use(new SignUpModal(page));
  },
});

export const expect = base.expect;
