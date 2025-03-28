import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButtons: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('[data-test^="remove"]');
  }
  
  /**
   * Verify cart page is loaded
   */
  async verifyCartPage() {
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.checkoutButton).toBeVisible();
  }
  
  /**
   * Get the number of items in the cart
   */
  async getItemCount() {
    return await this.cartItems.count();
  }
  
  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
  
  /**
   * Remove an item from the cart by index
   * @param index The index of the item to remove (0-based)
   */
  async removeItem(index: number = 0) {
    const buttons = await this.removeButtons.all();
    if (index < buttons.length) {
      await buttons[index].click();
    } else {
      throw new Error(`Index ${index} is out of bounds. Only ${buttons.length} items in cart.`);
    }
  }
}