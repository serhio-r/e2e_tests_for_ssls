import { BASE_URL } from '../configs/base.config';


export class AuthorizationPage {
  constructor(page) {
    this.page = page;
    this.emailInput = '[placeholder="Email"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button:has-text("Login")';
    this.showPassword = 'span[ng-hide="showPassword"]';
    this.incorrectCredentialsMessage = 'Uh oh! Email or password is incorrect';
    this.incorrectEmailFormatMessage = 'Uh oh! This\\nisn’t an email';
  }

  async goToAuthorizationPage() {
    await this.page.goto(BASE_URL + '/authorize');
  }

  async fillEmail(email) {
    await this.page.locator(this.emailInput).click();
    await this.page.locator(this.emailInput).fill(email);
  }

  async fillPassword(password) {
    await this.page.locator(this.passwordInput).click();
    await this.page.locator(this.passwordInput).fill(password);
  }

  async clickShowPassword() {
    await this.page.locator(this.showPassword).click();
  }

  async clickLoginButton() {
    await this.page.locator(this.loginButton).click();
  }
}