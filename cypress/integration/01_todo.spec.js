/// <reference types="Cypress" />

context ('Todos', () => {
    it('Adds todos', () => {
        cy.visit(Cypress.env('baseUrl'));
        cy.clearLocalStorage();

        // Makes sure we don't have any todos on screen before we run tests
        cy.getByTestId('todo').should('have.length', 0)

        cy.getByTestId('add-todo-input').type('Learn Cypress!')
        cy.getByTestId('add-todo-button').click()
        cy.getByTestId('add-todo-input').type('Write tests')
        cy.getByTestId('add-todo-button').click()
        cy.getByTestId('add-todo-input').type('Be happy')
        cy.getByTestId('add-todo-button').click()

        cy.getByTestId('todo').should('have.length', 3)

        cy.getByTestId('todo').children().first().should('have.text', 'Learn Cypress!')

        cy.getByTestId('pending-list').children().should('have.length', 3)
        cy.getByTestId('paused-list').children().should('have.length', 0)
        cy.getByTestId('completed-list').children().should('have.length', 0)
    });

    it('Does not allow users to add empty todos', () => {
        cy.getByTestId('todo').should('have.length', 3)
        cy.getByTestId('add-todo-button').click()
        cy.getByTestId('todo').should('have.length', 3)
    });

    it('Pause todos', () => {
        cy.contains('Do Later').should('not.exist')

        cy.getByTestId('pause-button').eq(1).click()

        cy.contains('Do Later').should('exist')

        cy.getByTestId('pending-list').children().should('have.length', 2)
        cy.getByTestId('paused-list').children().should('have.length', 1)
        cy.getByTestId('completed-list').children().should('have.length', 0)
    });

    it('Resumes Todos', () => {
        cy.contains('Do Later').should('exist').click()
        cy.getByTestId('resume-button').click()
        cy.contains('Do Later').should('not.exist')

        cy.getByTestId('pending-list').children().should('have.length', 3)
        cy.getByTestId('paused-list').children().should('have.length', 0)
        cy.getByTestId('completed-list').children().should('have.length', 0)
    });

    it('Completes Todos', () => {
        cy.contains('Completed').should('not.exist')

        cy.getByTestId('complete-button').eq(2).click()

        cy.contains('Completed').should('exist')

        cy.getByTestId('pending-list').children().should('have.length', 2)
        cy.getByTestId('paused-list').children().should('have.length', 0)
        cy.getByTestId('completed-list').children().should('have.length', 1)

    });

    it('Deletes todos', () => {
        cy.contains('Be happy').should('exist')
        cy.getByTestId('delete-button').eq(2).click()
        cy.contains('Be happy').should('not.exist')

        cy.getByTestId('pending-list').children().should('have.length', 2)
        cy.getByTestId('paused-list').children().should('have.length', 0)
        cy.getByTestId('paused-list').children().should('have.length', 0)
    });

    it('Allows users to reset the todo state manually', () => {
        // Reset button should not be visible unless we have at leat 1 completed todo
        cy.getByTestId('reset-button').should('not.exist')

        // Adds a third todo
        cy.getByTestId('add-todo-input').type('Test Reset Command')
        cy.getByTestId('add-todo-button').click()

        // They should all be pending
        cy.getByTestId('pending-list').children().should('have.length',3)
        cy.getByTestId('paused-list').children().should('have.length',0)
        cy.getByTestId('completed-list').children().should('have.length',0)

        cy.getByTestId('complete-button').eq(1).click()
        cy.getByTestId('pause-button').eq(1).click()

        // They should all be in serperate lists now
        cy.getByTestId('pending-list').children().should('have.length', 1)
        cy.getByTestId('paused-list').children().should('have.length', 1)
        cy.getByTestId('completed-list').children().should('have.length', 1)

        // the reset button should now be visible and we should click it
        cy.getByTestId('reset-button').should('exist').click()

        // The completed item should be gone and the remaining two should be pending
        cy.getByTestId('pending-list').children().should('have.length', 2)
        cy.getByTestId('paused-list').children().should('have.length', 0)
        cy.getByTestId('completed-list').children().should('have.length', 0)
    });
});