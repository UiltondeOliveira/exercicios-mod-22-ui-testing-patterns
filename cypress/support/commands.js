// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user, pass) => {
    const fd = new FormData()
    fd.append('log', user)
    fd.append('pwd', pass)
    fd.append('wp-submit', 'Acessar')
    fd.append('redirect-to', `/wp-admin`)
    fd.append('testcookie', 1)
    
    cy.request({
        url: '/wp-login.php',
        method: 'POST',
        body: fd
    }).then(resp => {
        resp.headers['set-cookie'].forEach(cookie => {
            const firstPart = cookie.split(';')[0]
            const divisor = firstPart.indexOf('=')
            const key = firstPart.substring(0, divisor)
            const value = firstPart.substring(divisor+1)
            cy.setCookie(key, value)
        })
    })
    cy.visit('wp-admin')
})

Cypress.Commands.add('register', (email, pass) => {
    cy.get('#reg_email').type(email)
    cy.get('#reg_password').type(pass)
    cy.get('input.button[value="Register"]').click()
})

Cypress.Commands.add('addToCart', () => {
    const fd = new FormData()
    fd.append('attribute_size', 'M')
    fd.append('attribute_color', 'Blue')
    fd.append('quantity', 1)
    fd.append('add-to-cart', 3680)
    fd.append('product_id', 3680)
    fd.append('variation_id', 3682)

    cy.request({
        url: '/product/atlas-fitness-tank/',
        method: 'POST',
        body: fd
    }).then(resp => {
        resp.headers['set-cookie'].forEach(cookie => {
            const firstPart = cookie.split(';')[0]
            const divisor = firstPart.indexOf('=')
            const key = firstPart.substring(0, divisor)
            const value = firstPart.substring(divisor+1)
            cy.setCookie(key, value)
        })
    })
    cy.visit('/product/atlas-fitness-tank/')
})


Cypress.Commands.add('checkout', () => {
    cy.visit('/checkout')
})

Cypress.Commands.add('checkoutOrderRecived', (title) => {
    cy.get(".page-title").should('have.text', title)
})

