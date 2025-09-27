import "cypress-real-events/support";
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
describe("Cart tests", () => {
  it("loads the homepage", () => {
    cy.visit("/"); // Vite dev server URL
  });
  it("Add to cart", () => {
    cy.visit("/");

    /* Check if there is a counter on cart icon */
    cy.get('[data-cy="counter"]').should("not.exist");

    /* Add 3 items and check if the cart counter appears and check item number */
    cy.get(' [data-cy="add-to-cart-1"]').first().click({ force: true });
    cy.get('[data-cy="counter"]').should("exist");
    cy.get('[data-cy="counter"]').contains(1);
    cy.get(' [data-cy="add-to-cart-2"]').first().click({ force: true });
    cy.get(' [data-cy="add-to-cart-3"]').first().click({ force: true });
    cy.get('[data-cy="counter"]').contains(3);

    /* Go to the Cart page and checks if the product data exist and is correct */
    cy.get('[data-cy="cart-icon"]').click();
    cy.get('[data-cy="row-0"]').should("exist");
    cy.get('[data-cy="quantity-0"]').contains(1);
    cy.get('[data-cy="row-1"]').should("exist");
    cy.get('[data-cy="quantity-1"]').contains(1);

    /*Increase existing quantity on cart page */
    cy.get('[data-cy="add-item-0"]').click();
    cy.get('[data-cy="quantity-0"]').contains(2);
    cy.get('[data-cy="counter"]').contains(4);

    /* Calculate Subtotal based on price and quantity */
    cy.get('[data-cy="item-price-0"]').contains(700);
    cy.get('[data-cy="item-quantity-0"]').contains(2);
    cy.get('[data-cy="item-subtotal-0"]').contains(1400);

    cy.get('[data-cy="subtract-item-0"]').click();
    cy.get('[data-cy="quantity-0"]').contains(1);
    cy.get('[data-cy="counter"]').contains(3);

    /* Prevents going under 1 */
    cy.get('[data-cy="quantity-1"]').contains(1);
    cy.get('[data-cy="subtract-item-1"]').click();
    cy.get('[data-cy="quantity-1"]').contains(1);

    /* Removes item completely */
    cy.get('[data-cy="remove-item-2"]').click();
    cy.get('[data-cy="row-2"]').should("not.exist");

    /* Calculate total of all items */
    cy.get('[data-cy^="item-price-"]').then(($prices) => {
      cy.get('[data-cy^="item-quantity-"]').then(($quantities) => {
        let expectedTotal = 0;

        $prices.each((index, priceEl) => {
          const price = parseFloat(priceEl.innerText);
          const quantity = parseInt($quantities[index].innerText);
          const subtotal = price * quantity;

          // Assert subtotal for each item
          cy.get(`[data-cy="item-subtotal-${index}"]`).should(
            "contain",
            subtotal
          );

          expectedTotal += subtotal;
        });
        cy.get('[data-cy="total"]').should("contain", expectedTotal);
      });
    });

    /* Clear the cart  */
    cy.get('[data-cy="clear-cart"]').click();
    cy.get('[data-cy="row-0"]').should("not.exist");
    cy.get('[data-cy="row-1"]').should("not.exist");
  });
});
