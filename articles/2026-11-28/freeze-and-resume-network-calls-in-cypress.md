---
title: "Freeze And Resume Network Calls In Cypress"
source: "https://glebbahmutov.com/blog/freeze-network-calls/"
publishedDate: "2026-11-26"
category: "testing"
feedName: "Gleb Bahmutov"
---

## How to freeze and resume network calls during end-to-end tests.

Often our tests need to confirm that while the application is loading its data, the web page shows specific information. For example, while the app is using `GET /fruit` network call to fetch the name of the fruit, the page shows "loading..." text. We can slow down the network call using `cy.intercept` command and confirm the loading text

1  
2  
3  
4  
5  
6  
7  
8  
9  
10  
11  
12  
13  
14  
15  
16  
17  
18  
19  
20  
21  
22  
23  
24  
25  
26  

it('shows the loading element', () => {  
    
  cy.intercept('GET', '/fruit', () =>  
    Cypress.Promise.delay(2000),  
  ).as('loadFruit')  
  cy.visit('/')  
    
  cy.contains('#fruit', 'loading...').should('be.visible')  
  cy.wait(2000)  
    
  cy.wait('@loadFruit')  
    
  cy.contains('loading', { timeout: 100 }).should(  
    'not.exist',  
  )  
    
    
    
  cy.get('@loadFruit')  
    .its('response.body')  
    .should('have.property', 'fruit')  
    .should('be.a', 'string')  
    .then((fruit) => {  
      cy.contains('#fruit', fruit)  
    })  
})  

Here is the test in action: it runs for 2 seconds, since we delayed the network call by returning a promise from `cy.intercept`:

1  
2  
3  
4  

  
cy.intercept('GET', '/fruit', () =>  
  Cypress.Promise.delay(2000),  
)  

 ![](https://glebbahmutov.com/blog/images/freeze-network-calls/loading.png)

But what if we want to make the test faster? We don't want to hard-code the two second delay. Instead we want to "freeze" the network call, run Cypress commands while it is frozen, and then resume it. We can perform these actions by manipulating a promise and its resolution.

## Resolve a promise

Let's avoid delaying a promise, and instead saving the "resolve" function for the promise

1  
2  
3  
4  
5  
6  
7  
8  
9  
10  
11  
12  
13  
14  
15  
16  
17  
18  
19  
20  
21  
22  
23  
24  
25  
26  
27  
28  
29  
30  
31  
32  
33  
34  
35  
36  
37  
38  

it('shows the loading element while the promise is unresolved', () => {  
    
    
  const networkDelay = { resolve: null }  
  cy.intercept(  
    'GET',  
    '/fruit',  
    () =>  
        
        
      new Cypress.Promise(  
        (resolve) => (networkDelay.resolve = resolve),  
      ),  
  ).as('loadFruit')  
  cy.visit('/')  
    
  cy.contains('#fruit', 'loading...').should('be.visible')  
    
    
    
  cy.wrap(networkDelay).invoke('resolve')  
    
  cy.wait('@loadFruit')  
    
  cy.contains('loading', { timeout: 100 }).should(  
    'not.exist',  
  )  
    
    
    
  cy.get('@loadFruit')  
    .its('response.body')  
    .should('have.property', 'fruit')  
    .should('be.a', 'string')  
    .then((fruit) => {  
      cy.contains('#fruit', fruit)  
    })  
})  

We use an object to store the "resolve" function

1  
2  
3  
4  
5  
6  
7  
8  
9  
10  
11  

const networkDelay = { resolve: null }  
  
  
  
  
new Cypress.Promise(  
  (resolve) => (networkDelay.resolve = resolve),  
),  
  
  
cy.wrap(networkDelay).invoke('resolve')  

The test is much faster: 96ms instead of 2 seconds

![Resolved promise test](https://glebbahmutov.com/blog/images/freeze-network-calls/ms.png)

## Reusable code

We can make a few custom commands to make freezing and resuming network calls easier. Just store the promises and resolutions under the aliases and have two custom commands

1  
2  
3  
4  
5  
6  
7  
8  
9  
10  
11  
12  
13  
14  
15  
16  
17  
18  
19  
20  
21  
22  
23  
24  
25  
26  
27  
28  
29  
30  
31  
32  
33  
34  
35  
36  
37  
38  
39  
40  
41  
42  

  
  
  
  
const frozenPromises = {}  
  
Cypress.Commands.add('freeze', (method, url, alias) => {  
  const atAlias = alias.startsWith('@')  
    ? alias  
    : \`@${alias}\`  
  
    
    
  if (frozenPromises\[atAlias\]?.resolve) {  
    frozenPromises\[atAlias\].resolve()  
  }  
  
  const promise = new Cypress.Promise((resolve) => {  
    frozenPromises\[atAlias\] = { resolve }  
  })  
  frozenPromises\[atAlias\].promise = promise  
  
  cy.intercept(method, url, () => {  
      
      
    return frozenPromises\[atAlias\].promise  
  }).as(alias)  
})  
  
Cypress.Commands.add('resume', (alias) => {  
  if (!alias.startsWith('@')) {  
    alias = \`@${alias}\`  
  }  
  const frozen = frozenPromises\[alias\]  
  if (!frozen) {  
    throw new Error(  
      \`No frozen promise found for alias ${alias}\`,  
    )  
  }  
  cy.log(\`Resuming network call for alias ${alias}\`)  
  frozen?.resolve?.()  
})  

Here is the same test written using `cy.freeze` and `cy.resume` commands, including 2 second test wait

1  
2  
3  
4  
5  
6  
7  
8  
9  
10  
11  
12  
13  
14  
15  
16  
17  
18  
19  
20  
21  
22  
23  
24  
25  
26  
27  
28  
29  
30  
31  
32  
33  
34  
35  
36  
37  
38  

it('shows the loading element until we resume the network call', () => {  
    
    
  cy.freeze('GET', '/fruit', 'loadFruit')  
  cy.visit('/')  
    
    
  cy.contains('#fruit', 'loading...').should('be.visible')  
    
  const baseUrl = Cypress.config('baseUrl')  
  cy.get('@loadFruit')  
    .its('request')  
    .should('deep.include', {  
      method: 'GET',  
      url: \`${baseUrl}/fruit\`,  
    })  
    
  cy.wait(2000)  
  cy.contains('#fruit', 'loading...', {  
    timeout: 0,  
  }).should('be.visible')  
  
    
    
  cy.resume('@loadFruit')  
  cy.contains('#fruit', 'loading...', {  
    timeout: 100,  
  }).should('not.exist')  
  
    
  cy.wait('@loadFruit')  
    .its('response.body')  
    .should('have.property', 'fruit')  
    .should('be.a', 'string')  
    .then((fruit) => {  
      cy.contains('#fruit', fruit)  
    })  
})  

 ![](https://glebbahmutov.com/blog/images/freeze-network-calls/resume.png)

I find `cy.freeze` plus `cy.resume` a good combination for any network testing, especially for figuring out time-related or order-related problems with the web page. For more tips and examples, see my course [Cypress Network Testing Exercises](https://cypress.tips/courses).

[**Older**

Branded Phone Type

](https://glebbahmutov.com/blog/branded-phone-type/)