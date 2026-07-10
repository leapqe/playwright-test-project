import { uiTest as test, expect } from '../fixtures/ui-base';


test.describe('Demoblaze - Sign up', () => {  

    test('signing up with empty fields is rejected', async ({ signUpModal }) => {
        
        const alertText = signUpModal.submitAndCaptureAlert();
        expect(alertText).toBe('Please fill out Username and Password.');
    });
});
