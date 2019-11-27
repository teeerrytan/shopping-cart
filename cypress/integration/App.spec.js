import { cy } from 'cypress';

describe('Test App', () => {
	it('launches', () => {
		cy.visit('/');
	});

	it('opens with the correct title rendered', () => {
		cy.visit('/');
		cy.get('[data-cy=title]').should('contain', 'SHAKALAKA');
	});
});
