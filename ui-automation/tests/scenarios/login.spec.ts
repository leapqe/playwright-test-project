import { uiTest as test, expect } from '../fixtures/ui-base';
import { faker } from '@faker-js/faker/locale/en';

test.describe('Demoblaze - Log in', () => {
    
    

    test.beforeEach(async ({ homePage, signUpModal, logInModal }) => {
        await homePage.goto();
        await homePage.openSignUpModal();
        await expect(logInModal.modal).toBeVisible();
       
    });

    test('loggin in with a non-existant user is rejected ', async ({ homePage, logInModal }) => {
        const username = faker.internet.username();
        const password = faker.internet.password( {length: 12, memorable: true, pattern: /[A-Za-z0-0]/ });

        await logInModal.fillForm( username, password);
        const alertText = await logInModal.submitAndCaptureAlert();

        await expect(alertText).toBe('User does not exit.');
        await expect(homePage.logOutNavLink).toBeVisible();
        
    });

});
