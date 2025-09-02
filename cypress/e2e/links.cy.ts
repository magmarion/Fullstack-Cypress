/// <reference types="cypress" />

describe('URL Shortener App', () => {

  beforeEach(() => {
    cy.visit('/') // Besök startsidan innan varje test
  })

  it('should create a short link', () => {
    const longUrl = 'https://example.com'

    cy.get('input[placeholder="Enter Long URL"]')
      .type(longUrl)

    cy.contains('Create').click()

    // Kontrollera att kort URL dyker upp i listan
    cy.get('ul li a')
      .should('exist')
      .and('contain.text', '/') // korta länken
  })

  it('should copy the short link to clipboard', () => {
    // Förutsätter att en länk redan finns
    cy.get('ul li button').first().click() // Klicka på copy-knappen

    cy.window().then(win => {
      return win.navigator.clipboard.readText()
    }).should('contain', '/')
  })

  it('should delete a link', () => {
    // Förutsätter att en länk redan finns
    cy.get('ul li button').last().click() // Klicka på delete-knappen

    // Listan ska nu vara tom
    cy.get('ul li').should('have.length', 0)
  })
})
