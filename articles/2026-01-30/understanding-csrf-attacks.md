---
title: "Understanding CSRF attacks"
source: "https://vercel.com/blog/understanding-csrf-attacks"
publishedDate: "2023-09-29"
category: "frontend"
feedName: "Vercel"
author: "Lydia Hallie"
---

5 min read

Sep 29, 2023

Understand the mechanics and risks of Cross-Site Request Forgery (CSRF) attacks, and discover crucial development practices.

Cross-Site Request Forgery (CSRF) is an attack that tricks users into executing unwanted actions on a web application where they're currently authenticated.

Imagine you're logged into your online banking platform. In another tab, you click on a seemingly harmless link. The next thing you know, money has been transferred out of your account without your knowledge. Oh no, you've just fallen victim to a CSRF attack! But how could this happen?

CSRF attacks occur in a few steps:

-   **1\. The attacker identifies a target site** that is vulnerable to CSRF. Typically, this is a site where important actions occur through predictable URLs or requests.
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1iUPq59ofOZSvswEyZyeFq%2F2d2a1c67a4e1d559700c664d6e483f01%2Fimage_38__1_.png&w=1920&q=75)

-   **2\. The attacker creates a malicious request**. For this demo, let's assume our bank's website transfers money using a simple URL like **`bank.com/transfer?amount=1000&toAccount=attackerAccountId`**. The user - unaware of what is about to happen - just logged into the bank's website, which sets a session cookie.
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F63dS7PcEVvxgsVPtBPyJxA%2F95504b94124a8bac0df7f9f063283d7a%2Fimage_41__1_.png&w=1920&q=75)

-   **3\. The attacker needs to trick an authenticated user** into triggering this request. They can do this by asking the user to click a link, or by embedding the malicious URL in the source code of an image on a different site, like: **`<img src="bank.com/transfer?amount=100&to=AttackerAccount" />`**.
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3zrwtBSHEQgqlohvsPoMml%2F52d2a4a79921130b1ec623124acb4f0c%2Fimage_42__1_.png&w=1920&q=75)

In this scenario, the attacker has created a website that automatically submits a form when the page loads. The user only needs to visit the website for this request to be sent.

-   **4\. The attacker can make a legitimate request to the bank’s server using the user's cookies and session**. Money gets transferred behind the scenes, usually without the user's knowledge.
    

### [Link to heading](#why-is-csrf-such-a-big-deal)**Why Is CSRF Such a Big Deal?**

CSRF attacks are dangerous because they:

-   Exploit authenticated sessions, making actions seem legitimate.
    
-   Can be executed without the user's knowledge.
    
-   Often leave little trace, as it’s not clear which user actions are legitimate and which aren’t.
    

### [Link to heading](#preventing-csrf-attacks)Preventing CSRF attacks

As developers, there are a few things we can implement to protect our users from CSRF attacks.

**Anti-CSRF Tokens**

Anti-CSRF tokens, often just called CSRF tokens, are a common and effective measure against CSRF attacks. They add an additional layer of security by requiring any state-changing request to include a token that the server will verify.

![The request is deemed legitimate if it includes a CSRF token that matches the token previously issued for that user's session by the server](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7ewWP9g93wVoNlbYh7YZ8V%2F9708670288d58532ea83915d98321bf4%2Fimage_43__1_.png&w=1920&q=75)

The request is deemed legitimate if it includes a CSRF token that matches the token previously issued for that user's session by the server

1.  **Token Generation:** When a user logs into a website, the server generates a unique CSRF token for that user's session. This token is typically a random string that's hard to guess.
    
2.  **Sending the Token:** The server sends this token to the client's browser. The browser might store this token in a hidden form field, a cookie, or in the site's local storage.
    
3.  **Making Requests:** Whenever the browser wants to make a request that can change data or state (like transferring money or updating an email address), it must include this CSRF token as part of the request.
    
4.  **Server Verification:** When the server receives the request, it checks if the CSRF token in the request matches the token it has on record for that user's session. If the tokens don't match or if the token is missing, the server will reject the request.
    
5.  **Short Lifespan:** These tokens often have a short lifespan to enhance security further. This means that even if an attacker manages to get hold of a token, they have a very limited window to carry out an attack; the token becomes useless afterward.
    

Generate a unique token each time a user loads a form and embed it within the form. On the server side, verify this token upon form submission. Attackers cannot predict this token, making it challenging to craft valid malicious requests.

### [Link to heading](#samesite-cookie-attribute)`**SameSite**` **Cookie Attribute**

Modern browsers support the **`SameSite`** cookie attribute, which prevents cookies from being sent in cross-site requests. This attribute can be particularly effective against CSRF attacks. [Read more about the SameSite cookie attribute here](https://vercel.com/guides/understanding-the-samesite-attribute).

### [Link to heading](#check-referer-headers)**Check** `**Referer**` **Headers**

Servers can examine the **`Referer`** header of incoming requests to verify if they originate from trusted pages.

### [Link to heading](#avoid-get-for-state-changing-operations)**Avoid** `**GET**` **for State-Changing Operations**

Reserve **`GET`** requests solely for data retrieval and avoid using them to modify the application's state. Instead, use **`POST`** requests for actions, as they provide an additional layer of security.

1.  `**GET**` is intended for fetching data. **`GET`** requests should be idempotent, meaning they don't cause any side effects, regardless of how many times they're made. When you access a website by typing a URL in the browser or click on a link, you're making a **`GET`** request.
    
2.  `**POST**` is used for submitting data to be processed to a specified resource. **`POST`**
    
    requests can change the server's state, like creating a new account or making a purchase.
    

**Reasons to Avoid Using** **`GET`** **for State-Changing Actions:**

1.  **Predictability:** If actions are performed using predictable **`GET`** URLs, an attacker can craft malicious links that, when clicked by a victim, trigger unwanted actions on the target site where the victim is authenticated.
    
2.  **Easier to Trick Users:** It's easier to trick users into clicking on a link (a **`GET`** request) than to trick them into submitting a form (typically a **`POST`** request). For instance, an attacker could embed an image tag in a forum post with a source URL, triggering a harmful **`GET`** action.
    
3.  **Browser History:** **`GET`** requests and their parameters are stored in browser history. If these requests change the application's state, it means revisiting that URL from the history could unintentionally trigger the action again.
    

**Benefits of Using** **`POST`** **for State-Changing Actions:**

1.  **Protection from Accidental Clicks:** A user can't be tricked into making a **`POST`**
    
    request just by clicking a link. They'd typically have to submit a form, which is a more intentional action.
    
2.  **Using Anti-CSRF Tokens:** **`POST`** requests allow for embedding anti-CSRF tokens within the request (usually inside the form), adding an additional layer of security against CSRF attacks.
    

Reserving **`GET`** for data retrieval and using **`POST`** for actions isn't just good for security, but it also follows the principle of making web behaviors predictable and understandable. Adhering to the intended use of HTTP methods leads to both a better user experience _and_ improved security.