describe('taildev', () => {
  beforeEach(() => cy.visit('/articles/dynamic-routing'));
  it('should render the title of the article', () => {
    cy.get('h1').should('contain', 'Dynamic Routing and Static Generation')
  });
  it('should render Youtube', () => {
    cy.get('iframe').should('be.visible')
  })
});
