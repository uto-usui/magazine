---
title: "Cypress Test For Optional Data"
source: "https://glebbahmutov.com/blog/cypress-test-for-optional-data/"
publishedDate: "2026-10-14"
category: "testing"
feedName: "Gleb Bahmutov"
---

## How to properly test the backend that might return an optional data object.

Imagine you are building an online shopping site. Your goal is to build the best customer-to-customer site, similar to [mercari.com](https://www.mercari.com/) 😉. When the user enters a new listing details. the system tries to suggest the best shipping option; the online commerce lives and dies by the shipping rates. So you want to suggest to the user the shipping dimensions and options that make sense. But sometimes there is no guess, so the shipping dimensions might be missing. Here is how it looks for our example test site:

![The application without and with data](https://glebbahmutov.com/blog/images/cypress-test-for-optional-data/app.png)

The dimensions predictions data is returned by the backend in response to `POST /dimensions` call

![POST /dimensions response with dimensions object](https://glebbahmutov.com/blog/images/cypress-test-for-optional-data/response.png)

If the backend cannot generate the dimensions predictions, the call returns `{ "dimensions": null }`. Let's test it.

## Loading element

The first thing I test is the loading element to confirm the user sees something meaningful while the backend is crunching numbers.

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

it('shows the loading element', () => {  
  cy.intercept('POST', '/dimensions', () =>  
    Cypress.Promise.delay(2000),  
  ).as('dimensions')  
  
  cy.visit('dimensions/index.html')  
  cy.get('.spinner').should('be.visible').wait(1500)  
  cy.get('.spinner', { timeout: 0 }).should(  
    'be.visible',  
  )  
  cy.wait('@dimensions')  
    
  cy.get('.spinner', { timeout: 500 }).should(  
    'not.be.visible',  
  )  
})  

We delay the app's `POST /dimensions` call by 2 seconds and confirm the loading spinner is shown. By using `cy.wait('@dimensions')` command we confirm the network stub is used - the application isn't using something else to load the prediction.

 ![](https://glebbahmutov.com/blog/images/cypress-test-for-optional-data/loading-element.png)

Great.

## No data

Let's test what happens when the backend returns `dimensions: null` property in the response. We are not interested in completely stubbing the network call with the fixture; there might be other fields in the response that are not related to the dimensions guess. We will stub the network call and delete the `dimensions` property.

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

it('sends no dimensions', () => {  
  cy.intercept('POST', '/dimensions', (req) => {  
    req.continue((res) => {  
      delete res.body.dimensions  
    })  
  }).as('dimensions')  
  
  cy.visit('dimensions/index.html')  
  cy.wait('@dimensions')  
  cy.contains(  
    '#status',  
    'No dimensions predicted this time.',  
  ).should('be.visible')  
})  

![Testing no dimensions in the response](https://glebbahmutov.com/blog/images/cypress-test-for-optional-data/no-dimensions.png)

**Tip:** end-to-end tests should be focused on the concrete subject, do not test _everything_ in every test to avoid having to change lots of tests even on the smallest app changes.

## Dimensions prediction

Now let's confirm the app shows the dimensions if the server returns an object. We want to return the mock `dimensions: { ... }` object, but we want to make sure it matches what the server normally returns. So to "catch" the schema changes, we will validate the real server response, while swapping it with our mock object.

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
43  

import spok from 'cy-spok'  
  
const dimensionsCheck = spok({  
  width: spok.number,  
  height: spok.number,  
  depth: spok.number,  
  units: spok.string,  
  confidence: spok.number,  
})  
  
it('sends dimensions', () => {  
  cy.intercept('POST', '/dimensions', (req) => {  
    req.continue((res) => {  
        
      if (res.body.dimensions) {  
        dimensionsCheck(res.body.dimensions)  
      }  
  
        
      res.body.dimensions = {  
        width: 1,  
        height: 2,  
        depth: 3,  
        units: 'in',  
        confidence: 0.99,  
      }  
        
        
      dimensionsCheck(res.body.dimensions)  
    })  
  }).as('dimensions')  
  
  cy.visit('dimensions/index.html')  
  cy.wait('@dimensions')  
    
  cy.get('.measurements')  
    .should('be.visible')  
    .within(() => {  
      cy.contains('#width', '1')  
      cy.contains('#height', '2')  
      cy.contains('#depth', '3')  
    })  
})  

![Test validates and substitutes the dimensions object](https://glebbahmutov.com/blog/images/cypress-test-for-optional-data/mock1.png)

Notice how we "substitute" the `dimensions` object and validating both the real server response and our mock object to make sure nothing changes without the test knowing about it.

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

req.continue((res) => {  
    
  if (res.body.dimensions) {  
    dimensionsCheck(res.body.dimensions)  
  }  
  
    
  res.body.dimensions = {  
    width: 1,  
    height: 2,  
    depth: 3,  
    units: 'in',  
    confidence: 0.99,  
  }  
    
    
  dimensionsCheck(res.body.dimensions)  
})  

I am using [cy-spok](https://github.com/bahmutov/cy-spok) plugin for checking objects against simple schemas. We can be more precise when checking the `dimensions` properties. For example, we know that the dimensions can only be inches or centimeters. Similarly, we know the likely range for model predictions:

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

import spok from 'cy-spok'  
  
  
const dimensionsCheck = spok({  
  $topic: 'Dimensions',  
  width: spok.range(1, 20),  
  height: spok.range(1, 20),  
  depth: spok.range(1, 20),  
  units: spok.oneOf(\['in', 'cm'\]),  
  confidence: spok.range(0, 1),  
})  

![Stricter schema check](https://glebbahmutov.com/blog/images/cypress-test-for-optional-data/mock2.png)

Beautiful.

[**Older**

Cypress Cloud Test Triage Using AI

](https://glebbahmutov.com/blog/cypress-cloud-test-triage-using-ai/)