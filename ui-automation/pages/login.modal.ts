import { Page, Locator } from '@playwright/test';

/**
 * Log in modal (#logInModal).
 *
 * Successful login closes the modal and updates the nav bar (no alert).
 * Failed login fires a native JS alert ("Wrong password." /
 * "User does not exist.") — captured by submitAndCaptureAlert().
 */
export class LogInModal {
    readonly page: Page;
    readonly modal: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly logInButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.locator('#logInModal');

        this.usernameInput = this.modal.locator('#loginusername');
        this.passwordInput = this.modal.locator('#loginpassword');
        this.logInButton = this.modal.getByRole('button', { name: 'Log in' });
        this.closeButton = this.modal.getByRole('button', { name: 'Close' });
    }

    async fillForm(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async submit(): Promise<void> {
        await this.logInButton.click();
    }

    async submitAndCaptureAlert(): Promise<string> {
        const alertMessage = new Promise<string>((resolve) => {
            this.page.once('dialog', async (dialog) => {
                const message = dialog.message();
                await dialog.accept();
                resolve(message);
            });
        });
        await this.logInButton.click();
        return alertMessage;
    }
}
