import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  // Page reference
  readonly page: Page;
  
  // Core UI elements
  readonly appLogo: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  
  // Product-specific buttons
  readonly backpackAddButton: Locator;
  readonly bikelightAddButton: Locator;
  readonly boltTshirtAddButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // Core UI elements
    this.appLogo = page.locator('.app_logo');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    
    // Product-specific buttons
    this.backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.bikelightAddButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.boltTshirtAddButton = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  }
  
  /**
   * Verify we're on the inventory page
   */
  async expectInventoryPageVisible() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.appLogo).toBeVisible();
  }
  
  /**
   * Add backpack to cart
   */
  async addBackpackToCart() {
    await this.backpackAddButton.click();
  }
  
  /**
   * Add bike light to cart
   */
  async addBikelightToCart() {
    await this.bikelightAddButton.click();
  }
  
  /**
   * Add bolt t-shirt to cart
   */
  async addBoltTshirtToCart() {
    await this.boltTshirtAddButton.click();
  }
  
  /**
   * Check if cart has items
   */
  async hasItemInCart() {
    return this.shoppingCartBadge.isVisible();
  }
  
  /**
   * Get cart item count
   */
  async getCartItemCount() {
    try {
      await this.shoppingCartBadge.waitFor({ state: 'visible', timeout: 2000 });
      const text = await this.shoppingCartBadge.textContent();
      return text ? parseInt(text, 10) : 0;
    } catch (error) {
      // Badge might not exist if cart is empty
      return 0;
    }
  }
  
  /**
   * Navigate to shopping cart
   */
  async goToCart() {
    await this.shoppingCartLink.click();
  }
  
  /**
   * Perform logout action
   */
  async logout() {
    await this.burgerMenuButton.click();
    // Wait for menu animation
    await this.page.waitForTimeout(500);
    await this.logoutLink.click();
  }
}