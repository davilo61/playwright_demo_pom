import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Process', () => {
  // Set a reasonable timeout for the entire test suite
  test.setTimeout(15000);
  
  // Declare page objects
  let loginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  
  // Before each test, log in to the application
  test.beforeEach(async ({ page }) => {
    // Create page objects
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    // Navigate to login page and log in
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify we're on the inventory page
    await inventoryPage.expectInventoryPageVisible();
  });
  
  test('complete checkout process with one item', async () => {
    // Step 1: Add backpack to cart
    await inventoryPage.addBackpackToCart();
    
    // Verify item was added to cart
    const hasItems = await inventoryPage.hasItemInCart();
    expect(hasItems).toBeTruthy();
    
    // Step 2: Go to cart
    await inventoryPage.goToCart();
    await cartPage.verifyCartPage();
    
    // Verify there's 1 item in the cart
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(1);
    
    // Step 3: Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Step 4: Fill checkout information
    await checkoutPage.fillCheckoutInfo('Jon', 'Doe', '12345');
    
    // Step 5: Complete checkout
    await checkoutPage.completeCheckout();
    
    // Step 6: Verify checkout complete
    await checkoutPage.verifyCheckoutComplete();
    
    // Step 7: Return to products
    await checkoutPage.returnToProducts();
    
    // Verify back on inventory page
    await inventoryPage.expectInventoryPageVisible();
    
    // Verify cart is empty
    const finalCount = await inventoryPage.getCartItemCount();
    expect(finalCount).toBe(0);
  });
});