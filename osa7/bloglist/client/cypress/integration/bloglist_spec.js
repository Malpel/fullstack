
describe('Bloglist', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Maydup Nem',
            username: 'M_Nem',
            password: 'good_password'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000/')
    })

    it('visits the login page', function () {
        cy.contains('Login')
    })

    it('valid user can login', function () {
        cy.get('[data-cy=username')
            .type('M_Nem')

        cy.get('[data-cy=password]')
            .type('good_password')

        cy.get('[data-cy=login]')
            .click()

        cy.get('[data-cy=header]')
            .contains('Blogs')

        cy.get('[data-cy=menu-username]')
            .contains('M_Nem')
    })

    it('invalid user cannot login', function () {
        cy.get('[data-cy=username')
            .type('iwillfail')

        cy.get('[data-cy=password]')
            .type('salis123')

        cy.get('[data-cy=login]')
            .click()

        cy.get('[data-cy=notification]')
            .contains('wrong username or password')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.get('[data-cy=username')
                .type('M_Nem')

            cy.get('[data-cy=password]')
                .type('good_password')

            cy.get('[data-cy=login]')
                .click()
        })

        it('a new blog can be added', function () {
            cy.get('[data-cy=newBlog]')
                .click()

            cy.get('[data-cy=title]')
                .type('Cypress E2E-testing')

            cy.get('[data-cy=author]')
                .type('Cypress Hill')

            cy.get('[data-cy=url]')
                .type('cypress.io')

            cy.get('[data-cy=submitBlog]')
                .click()

            cy.get('[data-cy=notification]')
                .contains('a new blog Cypress E2E-testing by Cypress Hill added')

        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.get('[data-cy=newBlog]')
                    .click()

                cy.get('[data-cy=title]')
                    .type('Second Test Blog')

                cy.get('[data-cy=author]')
                    .type('Cypress Hill')

                cy.get('[data-cy=url]')
                    .type('cypress.io')

                cy.get('[data-cy=submitBlog]')
                    .click()

                cy.get('[data-cy=notification]')
                    .contains('a new blog Second Test Blog by Cypress Hill added')
            })

            it('it can be liked', function () {
                cy.get('[data-cy=bloglist]')
                    .contains('Second Test Blog')
                    .click()

                cy.get('[data-cy=likeButton]')
                    .click()

                cy.get('[blogLikes]')
                    .contains('1')
            })
        })
    })
})