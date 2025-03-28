# Playwright POM Demo

This repository demonstrates how to implement the Page Object Model (POM) pattern using Playwright with TypeScript. It contains automated tests for the Sauce Demo e-commerce website.

## Project Structure

```
playwright-pom-demo/
├── pages/              # Page Object classes
│   ├── LoginPage.ts    # Login page interactions
│   ├── InventoryPage.ts # Product inventory page interactions
│   ├── CartPage.ts     # Shopping cart page interactions
│   └── CheckoutPage.ts # Checkout process interactions
├── tests/              # Test files
│   ├── inventory.spec.ts # Inventory page tests
│   └── checkout-process.spec.ts # End-to-end checkout flow tests
├── playwright.config.ts # Playwright configuration
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Page Objects

The Page Object Model pattern encapsulates page-specific elements and actions into classes:

- **LoginPage**: Handles authentication functionality
- **InventoryPage**: Manages product listings and adding items to cart
- **CartPage**: Controls shopping cart interactions
- **CheckoutPage**: Manages the complete checkout process

Each page object contains:
- Locators for page elements
- Methods for page-specific actions
- Verification methods

## Tests

The test files demonstrate how to use the page objects to create maintainable test scenarios:

- **inventory.spec.ts**: Tests for browsing products and adding to cart
- **checkout-process.spec.ts**: End-to-end test of the complete purchase flow

## Setup and Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

Run all tests:
```bash
npm test
```

Run a specific test file:
```bash
npx playwright test tests/checkout-process.spec.ts
```

Run tests with a specific browser:
```bash
npx playwright test --project=chromium
```

Run tests in headed mode (visible browser):
```bash
npx playwright test --headed
```

## Best Practices Demonstrated

- **Separation of Concerns**: Test logic is separate from page implementation
- **Reusable Components**: Page objects can be used across multiple tests
- **Maintainable Selectors**: Element locators are centralized and use data-test attributes
- **Clean Test Structure**: Tests focus on user flows rather than implementation details
- **Explicit Waits**: Proper waiting strategies for reliable test execution

## Test Website

Tests are run against the [Sauce Demo](https://www.saucedemo.com/) website, which is specifically designed for practicing test automation.

- **Username**: standard_user
- **Password**: secret_sauce
