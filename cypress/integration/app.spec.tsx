describe('Navigation', () => {
  it('Check the title of the page', () => {
    cy.visit('http://localhost:3000/')
    cy.title().should('eq', 'Cristiano Luis')
  })
})
