/// <reference types="cypress" />

describe('URL Shortener App', () => {
  const mockLinks = [
    {
      id: '1',
      userId: 'mockUser',
      originalUrl: 'https://example.com',
      shortCode: 'abc123',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      userId: 'mockUser',
      originalUrl: 'https://openai.com',
      shortCode: 'xyz789',
      createdAt: new Date().toISOString(),
    },
  ]

  beforeEach(() => {
    // Mocka GET /api/links
    cy.intercept('GET', '/api/links', {
      statusCode: 200,
      body: mockLinks,
    }).as('getLinks')

    cy.visit('/') // Besök startsidan
  })

  it('should render header correctly', () => {
    cy.get('h1').should('contain.text', 'URL Shortener')
  })

  it('should display existing links', () => {
    cy.get('ul li').should('have.length', mockLinks.length)
    cy.get('ul li a').first().should('contain.text', mockLinks[0].shortCode)
  })

  it('should create a new short link', () => {
    const longUrl = 'https://example.com/new'

    // Mocka POST /api/links
    cy.intercept('POST', '/api/links', {
      statusCode: 200,
      body: {
        id: '3',
        userId: 'mockUser',
        originalUrl: longUrl,
        shortCode: 'new123',
        createdAt: new Date().toISOString(),
      },
    }).as('createLink')

    cy.get('input[placeholder="Enter Long URL"]').type(longUrl)
    cy.contains('Create').click()

    cy.wait('@createLink')
    cy.get('ul li').should('have.length', mockLinks.length + 1)
    cy.get('ul li a').last().should('contain.text', 'new123')
  })

  it('should copy a link to clipboard', () => {
    cy.get('ul li button').first().click()
    cy.window().then((win) => {
      return win.navigator.clipboard.readText()
    }).should('contain', mockLinks[0].shortCode)
  })

  it('should delete a link', () => {
    cy.intercept('DELETE', '/api/links/*', { statusCode: 200 }).as('deleteLink')

    // Klicka på delete-knappen på första list-item
    cy.get('ul li').first().within(() => {
      cy.get('button').eq(1).click() // Delete-knappen
    })

    cy.wait('@deleteLink')

    // Eftersom vi mockar, uppdatera DOM manuellt om du vill:
    cy.get('ul li').should('have.length', mockLinks.length - 1)
  })

})
