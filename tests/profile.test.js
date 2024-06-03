import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { AuthorizationPage } from '../pages/AuthorizationPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { VALID_CREDENTIALS } from '../configs/credentials.config.js';

let homePage;
let authorizationPage;
let profilePage;

async function getInnerText(page, locator) {
  const element = await page.waitForSelector(locator);
  return element.innerText();
}

async function getClassNamesString(page, locator) {
  const element = await page.waitForSelector(locator);
  const classAttributeValue = await element.getAttribute('class');
  const classNamesArray = classAttributeValue.split(' ');
  return classNamesArray.join(' ');
}

test('Profile Page - Verify Saved Values', async ({ page }) => {
  homePage = new HomePage(page);
  authorizationPage = new AuthorizationPage(page);
  profilePage = new ProfilePage(page);

  // Precondition Step 1: Go to Home Page
  await homePage.goToHomePage();

  // Precondition Step 2: Login
  await homePage.clickLoginButton();
  await authorizationPage.fillEmail(VALID_CREDENTIALS.email);
  await authorizationPage.fillPassword(VALID_CREDENTIALS.password);
  await authorizationPage.clickLoginButton();

  // Precondition Step 3: Go to Profile Page
  await profilePage.clickUserInfoButton();
  await profilePage.clickProfileButton();

  // Precondition Step 4: Store initial values
  const nameValue = await getInnerText(page, profilePage.nameLocator);
  const emailValue = await getInnerText(page, profilePage.emailLocator);
  const passwordValue = await getInnerText(page, profilePage.passwordLocator);
  const addressValue = await getInnerText(page, profilePage.addressLocator);
  const pinValue = await getInnerText(page, profilePage.pinLocator);
  const classNamesString = await getClassNamesString(page, profilePage.newsletterLocator);

  // Precondition Step 5: Logout
  await profilePage.clickUserInfoButton();
  await profilePage.logOut();

  // Steps: Re-Login and go to Profile Page
  await authorizationPage.fillEmail(VALID_CREDENTIALS.email);
  await authorizationPage.fillPassword(VALID_CREDENTIALS.password);
  await authorizationPage.clickLoginButton();
  await profilePage.clickUserInfoButton();
  await profilePage.clickProfileButton();
  await expect(page).toHaveURL(/.*profile/)
  await expect(page.locator(profilePage.nameLocator)).toBeVisible();

  // Assertion: Check saved values against displayed values
  await expect(page.locator(profilePage.nameLocator)).toHaveText(nameValue);
  await expect(page.locator(profilePage.emailLocator)).toHaveText(emailValue);
  await expect(page.locator(profilePage.passwordLocator)).toHaveText(passwordValue);
  await expect(page.locator(profilePage.addressLocator)).toHaveText(addressValue);
  await expect(page.locator(profilePage.pinLocator)).toHaveText(pinValue);
  await expect(page.locator(profilePage.newsletterLocator)).toHaveClass(classNamesString);
});
