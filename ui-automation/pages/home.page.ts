import { Page, Locator } from '@playwright/test';

/**
 * Home page (index.html) — owns the nav bar, which is where the
 * Sign up / Log in / Log out links and the welcome message live.
 */
export class HomePage {
    readonly page: Page;
    readonly signUpNavLink: Locator;
    readonly logInNavLink: Locator;
    readonly logOutNavLink: Locator;
    readonly welcomeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // Nav "Sign up" and modal "Sign up" share text, so scope by role:
        // the nav item is a link, the modal submit is a button.
        this.signUpNavLink = page.getByRole('link', { name: 'Sign up' });
        this.logInNavLink = page.getByRole('link', { name: 'Log in' });
        this.logOutNavLink = page.getByRole('link', { name: 'Log out' });
        // "Welcome <username>" — no semantic role available, id is stable.
        this.welcomeMessage = page.locator('#nameofuser');
    }

    async goto(): Promise<void> {
        await this.page.goto('/index.html');
    }

    async openSignUpModal(): Promise<void> {
        await this.signUpNavLink.click();
    }

    async openLogInModal(): Promise<void> {
        await this.logInNavLink.click();
    }
}
