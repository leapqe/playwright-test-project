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
        await expect(homePage.logOutNavLink).toBeVisible();
        await expect(homePage.logInNavLink).toBeHidden();
    });

    test('logged-in user can log out', async ({ homePage, logInModal }) => {
        await logInModal.fillForm(user.username, user.password);
        await logInModal.submit();
        await expect(homePage.welcomeMessage).toHaveText(`Welcome ${user.username}`);

        await homePage.logInNavLink.click();

        await expect(homePage.logInNavLink).toBeVisible();
        await expect(homePage.logOutNavLink).toBeHidden();
    });

    test('login with wrong password is rejected', async ({ logInModal }) => {
        await logInModal.fillForm(user.username, 'WrongPass123!');
        const alertText = await logInModal.submitAndCaptureAlert();

        expect(alertText).toBe('Wrong password.');
        await expect(logInModal.modal).toBeVisible(); 
    });

    test('login with a non-existent user is rejected', async ({ logInModal }) => {
        const newUser = {
            username: faker.internet.username(),
            password: faker.internet.password({ length: 12, memorable: true, pattern: /[A-Za-z0-9]/ }),
        };
        await logInModal.fillForm(newUser.username, newUser.password);
        const alertText = await logInModal.submitAndCaptureAlert();

        expect(alertText).toBe('User does not exist.');
    });

    test('login with empty fields is rejected', async ({ logInModal }) => {

        const alertText = await logInModal.submitAndCaptureAlert();
        expect(alertText).toBe('Please fill out Username and Password.');
    });
});
