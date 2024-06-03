import { BASE_URL } from '../configs/base.config';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.loginButton = 'button:has-text("Log in")';
    this.pageTitle = 'Cheap SSL Certificates—Buy SSL Certs $3.75 | 30-day trial';
  }

  async goToHomePage() {
    await this.page.goto(BASE_URL);
  }

  async clickLoginButton() {
    await this.page.locator(this.loginButton).click();
  }
}