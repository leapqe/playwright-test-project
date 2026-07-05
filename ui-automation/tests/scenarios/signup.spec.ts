import { uiTest as test, expect } from '../fixtures/ui-base';
import { faker } from '@faker-js/faker/locale/en';

test.describe('Demoblaze - Sign up', () => {
   
    test.beforeEach(async ({ homePage, signUpModal }) => {
        await homePage.goto();
        await homePage.openSignUpModal();
        await expect(signUpModal.modal).toBeVisible();
    });

    test('user can sign up with valid, unique credentials', async ({ signUpModal }) => {
        const user = {
            username: faker.internet.username(),
            password: faker.internet.password({ length: 12, memorable: true, pattern: /[A-Za-z0-9]/ }),
        };

        await signUpModal.fillForm(user.username, user.password);
        const alertText = await signUpModal.submitAndCaptureAlert();

        expect(alertText).toBe('Sign up successful.');
    });

    test('signing up with empty fields is rejected', async ({ signUpModal }) => {
        const alertText = await signUpModal.submitAndCaptureAlert();

        expect(alertText).toBe('Please fill out Username and Password.');
    });

    test('signing up with username only (no password) is rejected', async ({ signUpModal }) => {
        await signUpModal.usernameInput.fill(faker.internet.username());
        const alertText = signUpModal.submitAndCaptureAlert();

        expect(alertText).toBe('Please fill out Username and Password.');
    });
});
