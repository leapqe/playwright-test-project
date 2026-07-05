import { Page, Locator } from '@playwright/test';

/**
 * Sign up modal (#signInModal).

*/
export class SignUpModal {
    readonly page: Page;
    readonly modal: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signUpButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
      
        this.modal = page.locator('#signInModal');
        this.usernameInput = this.modal.getByLabel('Username:');
        this.passwordInput = this.modal.getByLabel('Password:');
        this.signUpButton = this.modal.getByRole('button', { name: 'Sign up' });
        this.closeButton = this.modal.getByRole('button', { name: 'Close' });
    }

    async fillForm(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async submitAndCaptureAlert(): Promise<string> {
        const alertMessage = new Promise<string>((resolve) => {
            this.page.once('dialog', async (dialog) => {
                const message = dialog.message();
                await dialog.accept();
                resolve(message);
            });
        });
        await this.signUpButton.click();
        return alertMessage;
    }
}
