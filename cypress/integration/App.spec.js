import { cy } from 'cypress';

describe('Test App', () => {
	it('launches', () => {
		cy.visit('/');
	});

	it('opens with the correct title rendered', () => {
		cy.visit('/');
		cy.get('[data-cy=title]').should('contain', 'SHAKALAKA');
	});

	it('shows the shopping cart when the shopping cart icon is clicked', () => {
		cy.visit('/');
		cy.get('[data-cy=shoppingCartIcon]').click();
		cy.get('[data-cy=shoppingCartCongtent]').should('contain', 'Shopping Cart');
	});
});
