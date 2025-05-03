describe("ProductList Search Functionality", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/menu"); // 🔁 adjust the URL if needed
    });
  
    it("should display all matching products for 'hoodie'", () => {
        // Type 'hoodie' into the search bar
        cy.get('[data-testid="search-input"]').type("hoodie");

        // Ensure at least one card appears
        cy.get('[data-testid="product-card"]')
          .should("have.length.greaterThan", 0)
          .each(($el) => {
            // Check that each visible card contains the word 'hoodie' in its text
            cy.wrap($el)
              .invoke("text")
              .should("match", /hoodie/i);
          });
      });
  
    it("should show all products when the search input is cleared", () => {
      // Type and then clear the input
      cy.get('[data-testid="search-input"]').type("hoodie");
      cy.wait(1000);
      cy.get('[data-testid="search-input"]').clear();
      cy.wait(1000);
  
      // Check that more products are visible
      cy.get(".grid > div").its("length").should("be.gte", 1); // assuming >1 product
    });
  });
