/// <reference types="cypress" />

describe('URL Shortener (Mockade API-anrop)', () => {
    // Mock-data för länkar – används för att simulera befintliga länkar utan att röra DB
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
        // Mocka GET /api/links för att simulera att sidan laddas med befintliga länkar
        cy.intercept('GET', '/api/links', {
            statusCode: 200,
            body: mockLinks,
        }).as('getLinks')

        cy.visit('/')
    })

    it('should render header correctly', () => {
        // Kontrollera att rubrik syns – enklare UI-test
        cy.get('h1').should('contain.text', 'Linkly')
    })

    it('should display existing links', () => {
        // Kontrollera att mockade länkar visas korrekt
        cy.get('ul li').should('have.length', mockLinks.length)
        cy.get('ul li a').first().should('contain.text', mockLinks[0].shortCode)
    })

    it('should create a new short link', () => {
        const longUrl = 'https://example.com/new'

        // Mocka POST /api/links för att simulera att en ny länk skapas utan att skriva till DB
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

        cy.get('input[placeholder="Enter URL"]').type(longUrl)
        cy.contains('Create').click()

        // Vänta på mockad POST och kontrollera att UI uppdateras korrekt
        cy.wait('@createLink')
        cy.get('ul li').should('have.length', mockLinks.length + 1)
        cy.get('ul li a').last().should('contain.text', 'new123')
    })

    it('should copy a link to clipboard', () => {
        // Simulera klick på copy-knapp och kontrollera att clipboard innehåller rätt shortCode
        cy.get('ul li button').first().click()
        cy.window().then((win) => {
            return win.navigator.clipboard.readText()
        }).should('contain', mockLinks[0].shortCode)
    })

    it('should delete a link', () => {
        // Mocka DELETE /api/links/:id för att simulera borttagning av länk utan DB
        cy.intercept('DELETE', '/api/links/*', { statusCode: 200 }).as('deleteLink')

        // Klicka på delete-knappen på första list-item
        cy.get('ul li').first().within(() => {
            cy.get('button').eq(1).click()
        })

        cy.wait('@deleteLink')

        // Eftersom vi mockar, uppdatera DOM manuellt om vi vill: listan minskar med 1
        cy.get('ul li').should('have.length', mockLinks.length - 1)
    })
})
