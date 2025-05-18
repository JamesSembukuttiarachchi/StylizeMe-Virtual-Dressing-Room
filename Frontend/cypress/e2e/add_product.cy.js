describe("Add Product Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");

    cy.get("#email").type("admin@gmail.com");
    cy.get("#password").type("password");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");

    cy.contains("Manage Products").click();
    cy.contains("Add Product").click();
  });

  it("fills out the form and submits it", () => {
    cy.get('input[placeholder="Product Name"]').type("Test T-Shirt");
    cy.get('input[placeholder="Brand"]').type("TestBrand");
    cy.get('select').eq(0).select("Male");
    cy.get('select').eq(1).select("T-shirt");
    cy.get('input[placeholder="Price"]').type("49.99");

    cy.get('input[type="file"]').eq(0).selectFile("cypress/fixtures/test-image.jpg", { force: true });
    cy.get('input[type="file"]').eq(1).selectFile("cypress/fixtures/test-model.glb", { force: true });

    cy.get('input[placeholder="Quantity"]').type("10");

    cy.get('input[type="color"]').eq(0).invoke("val", "#ff0000").trigger("change");

    cy.contains("Add Color").click();
    cy.get('input[type="color"]').eq(1).invoke("val", "#00ff00").trigger("change");

    cy.get("textarea[placeholder='Product Description']").type("This is a test product.");

    cy.contains("Add Product").click();

    // Wait for SweetAlert2 popup
    cy.get(".swal2-popup", { timeout: 40000 }).should("be.visible");
    cy.get(".swal2-title").should("contain", "Product Added");
    cy.get(".swal2-html-container").should("contain", "The product has been added successfully.");
  });

  it("shows error or blocks submission when required fields are missing", () => {
    // Leave product name empty to simulate fail
    cy.get('input[placeholder="Brand"]').type("TestBrand");
    cy.get('select').eq(0).select("Male");
    cy.get('select').eq(1).select("T-shirt");
    cy.get('input[placeholder="Price"]').type("49.99");

    cy.get('input[type="file"]').eq(0).selectFile("cypress/fixtures/test-image.jpg", { force: true });
    cy.get('input[type="file"]').eq(1).selectFile("cypress/fixtures/test-model.glb", { force: true });

    cy.get('input[placeholder="Quantity"]').type("10");

    cy.get('input[type="color"]').eq(0).invoke("val", "#ff0000").trigger("change");

    cy.get("textarea[placeholder='Product Description']").type("Missing product name.");

    cy.contains("Add Product").click();

    // 🔴 Ensure SweetAlert is NOT shown
    cy.get(".swal2-popup", { timeout: 3000 }).should("not.exist");

    // ✅ Optionally check for validation error (adjust selector/message based on your app)
    //cy.contains("Please enter product name").should("exist");
  });
});
