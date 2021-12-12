/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('Frontpage ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:8080');
  });

  it('front page can be opened', function () {
    cy.contains('Etusivu');
    cy.contains('Etsi nimellä');
  });

  it('language can be changed', function () {
    cy.contains('Valitse kieli').click();
    cy.contains('English').click();
    cy.contains('Front page');
    cy.contains('Search by title');
  });

  it('a new case can be added', function () {
    cy.contains('+ Lisää uusi case').click();
    cy.get('#title').type('Uusi testicase');
    cy.get('#anamnesis').type('Anamneesi');
    cy.get('#submit-case').click();
    cy.contains('Case luotu onnistuneesti');
    cy.contains('Lisää case').not();
  });

  it.only('navbar links work as intended', function () {
    cy.contains('Käyttäjien seuranta').click();
    cy.url().should('eq', 'http://localhost:8080/users');
    cy.contains('Tiedostopankki').click();
    cy.url().should('eq', 'http://localhost:8080/files');
    cy.contains('Peliohjeet').click();
    cy.url().should('eq', 'http://localhost:8080/howtoplay');
    cy.contains('Taudinpurkauspeli').click();
    cy.url().should('eq', 'http://localhost:8080/');
  });
});
