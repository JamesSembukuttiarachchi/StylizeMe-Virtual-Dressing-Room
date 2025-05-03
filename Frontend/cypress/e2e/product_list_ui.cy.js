describe("Product List UI", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/menu"); // Adjust if route is different
    });
  
    it("loads the page with search and filters", () => {
      cy.get('[data-testid="search-input"]').should("exist");
      cy.get("select").should("have.length", 3); // 3 filters
      cy.get('[data-testid="product-card"]').should("exist");
    });
  
    it("displays product cards", () => {
      cy.get('[data-testid="product-card"]')
        .children()
        .should("have.length.greaterThan", 0);
    });
  
    it("filters products by search query", () => {
      cy.get('[data-testid="search-input"]').type("t-shirt");
      cy.wait(500); // Wait for debounce (if applicable)
      cy.get('[data-testid="product-card"]')
        .children()
        .each(($card) => {
          cy.wrap($card).contains(/t-shirt/i);
        });
    });
  
    it("filters by category, clothing type, and brand", () => {
      cy.get("select").eq(0).select("Female"); // Category
      cy.get("select").eq(1).select("Frock"); // Clothing Type
      cy.get("select").eq(2).select("H&M"); // Brand
      cy.wait(500);
  
      cy.get('[data-testid="product-card"]')
        .children()
        .each(($card) => {
          cy.wrap($card).should("contain.text", "Frock").and("contain.text", "H&M");
        });
    });
  
    it("paginates through product list", () => {
      cy.get('[data-testid="product-card"]')
        .children()
        .then(($firstPage) => {
          const firstItemText = $firstPage.first().text();
  
          cy.contains("Next").click();
          cy.wait(500);
          cy.get('[data-testid="product-card"]')
            .children()
            .first()
            .invoke("text")
            .should("not.eq", firstItemText);
        });
    });
  
    it("returns to previous page", () => {
      cy.contains("Next").click();
      cy.contains("Previous").click();
      cy.get('[data-testid="product-card"]').should("exist");
    });
  });
  