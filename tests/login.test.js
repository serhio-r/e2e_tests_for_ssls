import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { AuthorizationPage } from '../pages/AuthorizationPage.js';
import { VALID_CREDENTIALS, INVALID_CREDENTIALS, NON_EXIST_CREDENTIALS } from '../configs/credentials.config.js';

let homePage;
let authorizationPage;

test.beforeEach('Open start URL and navigate to login page', async ({ page }) => {
  homePage = new HomePage(page);
  authorizationPage = new AuthorizationPage(page);

  // Precondition: Open Home Page and click Login button (Steps 1-2 - сommon steps for all tests)
  await homePage.goToHomePage();
  await expect(page).toHaveTitle(homePage.pageTitle)
  await expect(page.locator(homePage.loginButton)).toBeVisible();
  await homePage.clickLoginButton();
  await expect(page).toHaveURL(/.*authorize/)
  await expect(page.locator(homePage.loginButton)).toBeVisible();
});

test('Autorization Page - Login with valid credentials should succeed', async ({ page }) => {

  // Step 3: Fill Login Inputs
  await authorizationPage.fillEmail(VALID_CREDENTIALS.email);
  await authorizationPage.fillPassword(VALID_CREDENTIALS.password);

  // Check Password Visible after clicking "eye" icon
  await authorizationPage.clickShowPassword();
  const inputPasswordValue = await page.$eval(`${authorizationPage.passwordInput}`, el => el.value);
  expect(inputPasswordValue).toEqual(VALID_CREDENTIALS.password);

  // Step 4: Click Login Button
  await authorizationPage.clickLoginButton();
  await expect(page).toHaveURL(/.*user/)
  await expect(page.locator(`button:has-text("${VALID_CREDENTIALS.email}")`)).toBeVisible();
});

test('Autorization Page - Login with non-existent credentials should fail', async ({ page }) => {

  // Step 3: Fill Login Inputs
  await authorizationPage.fillEmail(NON_EXIST_CREDENTIALS.email);
  await authorizationPage.fillPassword(NON_EXIST_CREDENTIALS.password);

  // Check Password Visible after clicking "eye" icon
  await authorizationPage.clickShowPassword();
  const inputPasswordValue = await page.$eval(`${authorizationPage.passwordInput}`, el => el.value);
  expect(inputPasswordValue).toEqual(NON_EXIST_CREDENTIALS.password);

  // Step 4: Click Login Button
  await authorizationPage.clickLoginButton();
  await expect(page.getByText(authorizationPage.incorrectCredentialsMessage)).toBeVisible();
});

test('Autorization Page - Login with invalid email format should display error message', async ({ page }) => {  

  // Step 3: Fill Login Inputs
  await authorizationPage.fillEmail(INVALID_CREDENTIALS.email);
  await authorizationPage.fillPassword(INVALID_CREDENTIALS.password);

  // Check Password Visible after clicking "eye" icon
  await authorizationPage.clickShowPassword();
  const inputPasswordValue = await page.$eval(`${authorizationPage.passwordInput}`, el => el.value);
  expect(inputPasswordValue).toEqual(NON_EXIST_CREDENTIALS.password);

  // Step 4: Click Login Button
  await authorizationPage.clickLoginButton();
  await page.$(`span:has-text("${authorizationPage.incorrectEmailFormatMessage}")`);
});