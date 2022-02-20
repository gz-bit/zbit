describe('shared-ui: TopicButton component', () => {
  beforeEach(() => cy.visit(
    '/iframe.html?id=topicbutton--primary&args=topicName:React'
  ));
    
    it('should render topic name', () => {
      cy.get('[data-testid=topicName]').should('contain', 'React');
    });

    it('should pass topic name to click event', () => {
      cy.get('[data-testid=TopicButton]').click()
      cy.get('[data-testid=clickResult]').should('contain', 'React')
    })
});
