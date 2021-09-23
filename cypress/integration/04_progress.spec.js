/// <reference types="Cypress" />

context("Progress", () => {
  it("Displays the proper width", () => {
    cy.visit(Cypress.env("baseUrl"));

    cy.getByTestId("todo").should("have.length", 0);

    // Add 4 todos
    cy.getByTestId("add-todo-input").type("Complete Tutorial");
    cy.getByTestId("add-todo-button").click();
    cy.getByTestId("add-todo-input").type("Learn Cypress");
    cy.getByTestId("add-todo-button").click();
    cy.getByTestId("add-todo-input").type("Edit Video");
    cy.getByTestId("add-todo-button").click();
    cy.getByTestId("add-todo-input").type("Upload Video");
    cy.getByTestId("add-todo-button").click();

    cy.getByTestId("complete-button").eq(0).click();
    cy.getByTestId("complete-button").eq(0).click();
    cy.getByTestId("pause-button").eq(1).click();

    // The width of the container
    // We don't want to hard code the pixel value because we don't want to
    // have to update the test each time that changes
    cy.getByTestId("progress-container")
      .invoke("width")
      .then((width) => {
        cy.getByTestId("complete-progress")
          .should("have.css", "width")
          .and("eq", `${width * 0.5}px`);
        cy.getByTestId("pause-progress")
          .should("have.css", "width")
          .and("eq", `${width * 0.75}px`);
      });
  });
});
