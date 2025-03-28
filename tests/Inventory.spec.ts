import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// This is the recommended pattern when you have multiple tests sharing setup
test.describe('Sauce Demo Tests', () => {
  // Set a reasonable timeout for the entire test suite
  test.setTimeout(15000);
  
  // Declare page objects
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  
  // Before each test, log in to the application
  test.beforeEach(async ({ page }) => {
    // Create page objects
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    // Navigate to login page and log in
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify we're on the inventory page
    await inventoryPage.expectInventoryPageVisible();
  });
  
  // Test case 1: Adding an item to cart
  test('should add backpack to cart', async () => {
    // Record initial cart count
    const initialCount = await inventoryPage.getCartItemCount();
    
    // Add backpack to cart with product-specific method
    await inventoryPage.addBackpackToCart();
    
    // Verify cart has items
    const hasItems = await inventoryPage.hasItemInCart();
    expect(hasItems).toBeTruthy();
    
    // Verify count increased (if initial state was empty cart)
    if (initialCount === 0) {
      const newCount = await inventoryPage.getCartItemCount();
      expect(newCount).toBe(1);
    }
  });
  
  // Test case 2: Logging out
  test('should log out successfully', async () => {
    // Perform logout
    await inventoryPage.logout();
    
    // Verify we're back on login page
    await expect(loginPage.loginButton).toBeVisible();
  });
});