import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login functionality', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    // Navigate to login page before each test
    await loginPage.goto();
  });

  test('should login with valid credentials', async () => {
    // Perform login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify we are redirected to inventory page (dashboard)
    await inventoryPage.expectInventoryPageVisible();
  });

  test('should show error with invalid credentials', async () => {
    // Perform login with invalid credentials
    await loginPage.login('invalid_user', 'wrong_password');
    
    // Verify error message is displayed
    await loginPage.expectErrorMessage('Username and password do not match any user');
    
    // Verify we are still on login page
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should require username and password', async () => {
    // Click login without entering credentials
    await loginPage.loginButton.click();
    
    // Verify validation error is shown
    await loginPage.expectErrorMessage('Username is required');
  });
});