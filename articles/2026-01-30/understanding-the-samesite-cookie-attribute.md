---
title: "Understanding the SameSite cookie attribute"
source: "https://vercel.com/blog/understanding-the-samesite-cookie-attribute"
publishedDate: "2023-10-02"
category: "frontend"
feedName: "Vercel"
author: "Lydia Hallie"
---

2 min read

Oct 2, 2023

Explore the SameSite cookie attribute's significance in ensuring web security and user privacy to strike the right balance between security and usability.

Navigating the web safely while ensuring user privacy is a top priority. When working with cookies, it’s important to ensure they are secure and serve their intended purpose without compromising user privacy.

One key attribute to consider is **`SameSite`**, which dictates when and how cookies are sent in cross-site requests.

## [Link to heading](#what-are-cookies)**What Are Cookies?**

[Cookies](https://vercel.com/guides/understanding-cookies) are small data pieces that web browsers save on user devices when websites ask them to. They help websites remember things about users, like their preferences or what's in their shopping cart.

However, with growing concerns about unwanted data sharing and potential security risks, there's a need to control when and where these cookies are used. That's where the **`SameSite`** attribute steps in, allowing developers to specify when a cookie is sent based on where the request comes from. This attribute can be set to **`Strict`**, **`Lax`**, or **`None`** to fit various needs.

### [Link to heading](#strict)**`Strict`**

When a cookie's **`SameSite`** attribute is set to **`Strict`**, it means the cookie will be sent only if the request originates from the same site.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FJ5iT60B06c2SrYGZAxuov%2F6533e6a9683669bae1dc2a33fa478eff%2Fimage_56.png&w=1920&q=75)

**Use Cases:**

-   Ideal for high-security applications like online banking.
    
-   Prevents any cross-site usage, ensuring high levels of data confidentiality.
    

### [Link to heading](#lax)`**Lax**`

The **`Lax`** setting strikes a balance between usability and security. With this setting, the cookie:

-   **Won't be sent on cross-site subresource requests**, such as images, stylesheets, and scripts.
    
-   **Will be sent for top-level navigations**, like when a user clicks on a link leading to the site.
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2cTLDCPzU6pIjYGxKunVoQ%2F58cfdce70ce99dccf5c80167b27600c0%2Fimage_34.png&w=1920&q=75)

**Use Cases:**

-   Useful for content embedded on other sites where some degree of cross-site interaction is okay.
    
-   Enhances the browsing experience by maintaining sessions even when users arrive from an external link.
    

If the **`SameSite`** attribute isn't set, browsers will treat the cookie as if it were set to `**Lax**`.

### [Link to heading](#none)`**None**`

For the cookie to be sent with every request, including cross-site ones, the **`SameSite`** attribute should be set to **`None`**.

However, when using **`SameSite=None`**, the cookie must also be marked as **`Secure`**, meaning it can only be transported over HTTPS. If you attempt to set a cookie with **`SameSite=None`** without the **`Secure`** attribute on an HTTPS site, the browser will likely show a warning in the console, and the cookie won't function as intended!

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F22Up7AARd24QKi1jQPBlhX%2F0308a6dc8b930a8a0bdb8c587054375f%2Fimage_57.png&w=1920&q=75)

**Use Cases:**

-   Cross-site tracking, often used by advertising platforms.
    
-   Single Sign-On systems that require authentication across various domains.
    
-   Functionalities intended for direct use by external websites.
    

Deciding which configuration to use depends on your specific use case.

-   **Want top-notch security?** Go with **`Strict`**. This guarantees the cookie is only ever sent to its origin, minimizing the risk of CSRF attacks or unintentional leaks.
    
-   **Want a mix of user-friendliness and safety?** Go with **`Lax`**. This ensures a smoother user experience while still offering protection against potential threats.
    
-   **Need to share cookie data across sites?** Go with **`None`**. Just remember to also set it to **`Secure`**.
    

## [Link to heading](#conclusion)**Conclusion**

The **`SameSite`** attribute offers web developers granular control over cookies, enhancing web security and ensuring a better user experience. By understanding the nuances of **`Strict`**, **`Lax`**, and **`None`**, you can make more informed decisions, keeping users both happy and secure.