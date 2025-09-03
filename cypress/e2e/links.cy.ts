/// <reference types="cypress" />

describe('URL Shortener (Test mot databas)', () => {
  beforeEach(() => {
    // Rensa testdatabasen innan varje test
    // Du behöver skapa detta endpoint i backend (t.ex. POST /api/test/reset)
    cy.request('POST', '/api/test/reset')

    cy.visit('/') // Besök startsidan
  })

  it('should render header correctly', () => {
    cy.get('h1').should('contain.text', 'URL Shortener')
  })

  it('should create and display a new short link', () => {
    const longUrl = 'https://example.com/new'

    cy.get('input[placeholder="Enter Long URL"]').type(longUrl)
    cy.contains('Create').click()

    // Kontrollera att länken nu syns i listan
    cy.get('ul li').should('have.length', 1)
    cy.get('ul li a').first().invoke('text').should('match', /^[a-z0-9]{6}$/)
  })

  it('should copy a link to clipboard', () => {
    const longUrl = 'https://example.com/copy'

    cy.get('input[placeholder="Enter Long URL"]').type(longUrl)
    cy.contains('Create').click()

    cy.get('ul li button').first().click()
    cy.window().then((win) => {
      return win.navigator.clipboard.readText()
    }).should('contain', '/')
  })

  it('should delete a link', () => {
    const longUrl = 'https://example.com/delete'

    // Skapa en länk först
    cy.get('input[placeholder="Enter Long URL"]').type(longUrl)
    cy.contains('Create').click()
    cy.get('ul li').should('have.length', 1)

    // Ta bort länken
    cy.get('ul li').first().within(() => {
      cy.get('button').eq(1).click()
    })

    // Kontrollera att den försvann
    cy.get('ul li').should('have.length', 0)
  })
})
