---
title: "Branded Phone Type"
source: "https://glebbahmutov.com/blog/branded-phone-type/"
publishedDate: "2026-11-06"
category: "testing"
feedName: "Gleb Bahmutov"
---

## Use TypeScript branded types to represent phone numbers in your tests.

In my previous blog post [Branded Types](https://glebbahmutov.com/blog/branded-types/ "Branded Types") I have shown a useful technique for representing time durations as "branded types" which removes the confusion between seconds and milliseconds.

1  
2  
3  
4  

  
const duration = 1  
  
cy.wait(duration)  

Let me show an other example: representing user phone numbers using branded types. This solves a common problem in end-to-end tests where the system has to verify the user to avoid scammers:

1  
2  
3  
4  

  
const phoneNumber1 = '+1 (123) 456-7890'  
const phoneNumber2 = '1234567890'  
const phoneNumber3 = '0001234567'  

In our [Mercari testing](https://slides.com/bahmutov/1000-e2e), we use type 2 and type 3 phone numbers to represent real and "dev-only" phone numbers. We want to distinguish these phone numbers from regular strings. We want to statically "catch" the problem of passing a string where a phone number is required

1  
2  
3  
4  
5  
6  
7  

  
  
  
const phoneNumber = 'call me'  
  
  
cy.enterPhoneNumber(phoneNumber)  

## Branded phone types

Let's represent the 10-digit phone numbers using branded types.

phone.d.ts

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

  
  
  
type PhoneNumber = string & { \_\_brand: 'phone' }  
  
  
  
  
  
type TestPhoneNumber = PhoneNumber & { \_\_phoneKind: 'test' }  
type RealPhoneNumber = PhoneNumber & { \_\_phoneKind: 'real' }  
  
  
  
  
type FormattedPhoneNumber = PhoneNumber & { \_\_phoneKind: 'formatted' }  

I like using ambient `.d.ts` files so that the common types are available everywhere in the testing repo. Right now we have the common "base" type `PhoneNumber` that is different from a string, and it is further "subdivided" into `TestPhoneNumber` and a `RealPhoneNumber`. Different utils and objects can specify the phone number types needed.

phone.ts

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

  
export const generateTestPhoneNumber = () => {  
  const phoneNumber = '000' + Cypress.\_.random(1e6, 1e7 - 1).toString()  
  return phoneNumber as TestPhoneNumber  
}  
  
  
  
export const CONSTANTS = {  
  phoneNumber: '1234567890' as RealPhoneNumber,  
}  

Great, but if all we know is that we have a string, how do we ensure that it is a valid phone number? Well, we can check:

-   test phone numbers are 10-digit strings that start with "000"
-   real phone numbers are 10-digit strings that do not start with "000" or "555"
-   formatted phone numbers follow their own pattern

We can write TypeScript assertion functions for easy type casting:

phone.ts

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

  
  
  
  
  
  
  
export function assertTestPhoneNumber(  
  phone: string,  
): asserts phone is TestPhoneNumber {  
  if (typeof phone !== 'string') {  
    throw new Error(\`Phone number must be a string. Got ${typeof phone}\`)  
  }  
  
  if (!/^000\\d{7}$/.test(phone)) {  
    throw new Error(\`Invalid test phone number: ${phone}\`)  
  }  
}  
  
  
  
  
  
export function assertRealPhoneNumber(  
  phone: string,  
): asserts phone is RealPhoneNumber {  
  if (typeof phone !== 'string') {  
    throw new Error(\`Phone number must be a string. Got ${typeof phone}\`)  
  }  
  
  if (!/^\\d{10}$/.test(phone)) {  
    throw new Error(\`Invalid real phone number: ${phone}\`)  
  }  
    
  if (phone.startsWith('0')) {  
    throw new Error(\`Invalid real phone number: ${phone}\`)  
  }  
    
  if (phone.startsWith('555')) {  
    throw new Error(\`Invalid real phone number: ${phone}\`)  
  }  
}  

The base phone number in our system is either a test phone number or a real phone number:

phone.ts

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

  
  
  
  
  
  
export function assertPhoneNumber(  
  phone: string,  
): asserts phone is TestPhoneNumber | RealPhoneNumber {  
  try {  
    assertTestPhoneNumber(phone)  
  } catch {  
    assertRealPhoneNumber(phone)  
  }  
}  

Here is how we can use it: imagine we have a string with a phone number.

1  
2  
3  

const phoneNumber = '0001234567'  
assertTestPhoneNumber(phoneNumber)  
console.log(phoneNumber)  

If we check the variable when it is declared, we see what TypeScript sees: a string

![TypeScript: phoneNumber variable holds a string](https://glebbahmutov.com/blog/images/branded-phone-type/string.png)

We could be explicit and declare the variable type

1  

const phoneNumber = '0001234567' as TestPhoneNumber  

But we could _assert_ the type by checking the string, then TS "knows" the current type, and the runtime validates it

1  
2  

const phoneNumber = '0001234567'  
assertTestPhoneNumber(phoneNumber)  

Look at the use of the variable `phoneNumber` after the `assertTestPhoneNumber` call:

![TypeScript: phoneNumber variable holds a test phone number](https://glebbahmutov.com/blog/images/branded-phone-type/phone.png)

Beautiful. We can receive data from our backend and immediately cast it by validating

1  
2  
3  
4  
5  
6  
7  

cy.request(...)  
  .its('data.phone')  
  .then(phone => {  
      
    assertTestPhoneNumber(phone)  
      
  })  

There is no more confusion, the branded types let us statically check the variables. Yet every test and real phone number is also a string, so we can pass and use them, just like any string

1  
2  
3  
4  
5  
6  
7  
8  

cy.request(...)  
  .its('data.phone')  
  .then(phone => {  
      
    assertTestPhoneNumber(phone)  
      
    cy.get('#phone').type(phone)  
  })  

[**Older**

Cypress Test For Optional Data

](https://glebbahmutov.com/blog/cypress-test-for-optional-data/)