import { uiTest as test, expect } from '../fixtures/ui-base';
import { faker } from '@faker-js/faker/locale/en';

test.describe('Demoblaze - Log in', () => {
    
    let user: { username: string; password: string };

    test.beforeEach(async ({ homePage, signUpModal, logInModal }) => {
        await homePage.goto();
        await homePage.openSignUpModal();
        await expect(signUpModal.modal).toBeVisible();
        user = {
            username: faker.internet.username(),
            password: faker.internet.password({ length: 12, memorable: true, pattern: /[A-Za-z0-9]/ }),
        };

        await signUpModal.fillForm(user.username, user.password);
        const alertText = await signUpModal.submitAndCaptureAlert();

        expect(alertText).toBe('Sign up successful.');
        await homePage.goto();
        await homePage.openLogInModal();
        await expect(logInModal.modal).toBeVisible();
    });

    test('user can log in with valid credentials', async ({ homePage, logInModal }) => {
        await logInModal.fillForm(user.username, user.password);
        await logInModal.submit();

        await expect(homePage.welcomeMessage).toHaveText(`Welcome ${user.username}`);
        await expect(homePage.logInNavLink).toBeVisible();
        
    });

});
