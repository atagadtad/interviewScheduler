describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

  describe("Appointments", () => {
    beforeEach(() => {
      cy.request("GET", "/api/debug/reset");

      cy.visit("/");

      cy.contains("Monday");
    });

    it("should book an interview", () => {
      cy.get("[alt=Add]")
        .first()
        .click();

      cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
      cy.get('[alt="Sylvia Palmer"]').click();

      cy.contains("Save").click();

      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Sylvia Palmer");
    });

    it("should edit an interview", () => {
      cy.get("[alt=Edit]")
        .first()
        .click({ force: true });
      cy.get('[type="text"]').clear();
      cy.get('[alt="Tori Malcolm"]').click();
      cy.get("[data-testid=student-name-input]").type("Big Boi Jay");
      cy.contains("Save").click();

      cy.contains(".appointment__card--show", "Big Boi Jay");
      cy.contains(".appointment__card--show", "Tori Malcolm");
    });

    it("should cancel an interview", () => {
      cy.get("[alt=Delete]")
        .first()
        .click({ force: true });
      cy.contains("Confirm").click();
      cy.contains("Deleting").should("exist");
      cy.contains("Deleting").should("not.exist");

      cy.contains(".appointment__card--show", "Archie Cohen").should(
        "not.exist"
      );
    });
  });
});
