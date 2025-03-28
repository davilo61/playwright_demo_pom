import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  
  // Checkout Information Form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  
  // Checkout Overview
  readonly finishButton: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;
  readonly inventoryItems: Locator;
  
  // Checkout Complete
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // Checkout Information Form
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    
    // Checkout Overview
    this.finishButton = page.locator('[data-test="finish"]');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryTotal = page.locator('.summary_total_label');
    this.inventoryItems = page.locator('.cart_item');
    
    // Checkout Complete
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }
  
  /**
   * Fill checkout information form
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
  
  /**
   * Complete checkout process
   */
  async completeCheckout() {
    await this.finishButton.click();
  }
  
  /**
   * Verify checkout completion
   */
  async verifyCheckoutComplete() {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.backHomeButton).toBeVisible();
  }
  
  /**
   * Return to products page after checkout
   */
  async returnToProducts() {
    await this.backHomeButton.click();
  }
}