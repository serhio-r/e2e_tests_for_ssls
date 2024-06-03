import { BASE_URL } from '../configs/base.config';
import { VALID_CREDENTIALS } from '../configs/credentials.config';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.profileButton = 'Profile';
    this.logOutButton = 'Log out';
    this.nameLocator = `span[ng-hide="activeRow === 'name'"]`;
    this.emailLocator = `span[ng-hide="activeRow === 'email'"]`;
    this.passwordLocator = `span[ng-hide="activeRow === 'password'"]`;
    this.phoneLocator = `span[ng-hide="activeRow === 'phone'"]`;
    this.addressLocator = `span[ng-hide="activeRow === 'address'"]`;
    this.pinLocator = `div[ng-class="{disabled: activeRow !== 'pin' && activeRow !== 'all'}"] .description .ng-binding`;
    this.newsletterLocator = `div[ng-class="{disabled: activeRow !== 'newsletter' && activeRow !== 'all'}"] .toggle-btn`;
  }

  async goToProfilePage() {
    await this.page.goto(BASE_URL + '/user/profile');
  }

  async clickUserInfoButton() {
    await this.page.locator(`button:has-text("${VALID_CREDENTIALS.email}")`).click()
  }

  async clickProfileButton() {
    await this.page.getByRole('link', { name: this.profileButton }).click();
  }

  async logOut() {
    await this.page.getByRole('button', { name: this.logOutButton }).click();
  }
}