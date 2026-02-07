---
title: "Styling Next.js with Styled JSX"
source: "https://nextjs.org/blog/styling-next-with-styled-jsx"
publishedDate: "2019-03-28"
category: "frontend"
feedName: "Next.js Blog"
---

[Styled JSX](https://github.com/vercel/styled-jsx) is a CSS-in-JS library that allows you to write encapsulated and scoped CSS to style your components. The styles you introduce for one component won't affect other components, allowing you to add, change and delete styles without worrying about unintended side effects.

## Getting started[](#getting-started)

Next.js includes Styled JSX by default, so getting started is as simple as adding a `<style jsx>` tag into an existing React element and writing CSS inside of it:

In this example, we're including styles for the component's container element and a paragraph. Even though we are using generic selectors, the styles don't affect elements with the `container` class name or `<p>` tags in other components. This is because Styled JSX ensures the styles are scoped to this component only (by applying additional unique class names to styled elements).

By adding just a single `jsx` attribute to a `<style>` element, you can write standard CSS that gets auto prefixed and automatically scoped to the component. `<style jsx>` elements should be placed inside the root element of the component.

## Adding global styles[](#adding-global-styles)

Most projects need some global styles to style the body element or provide css resets. Styled JSX allows us to add global styles using `<style jsx global>`. For example:

This applies a 20px font-size to all `<p>` tags in this specific page.

To apply global styles to all pages in our app, a good approach is to first create a layout component with the global styles, then wrap all pages with it.

Using a layout component provides the flexibility to apply a certain set of styles to some pages while still allowing a different style for others:

In Next.js, we can load the layout once for all pages by creating a custom [`App` component](https://nextjs.org/docs#custom-app) within `pages/_app.js`, importing the `Layout` component, and then adding it to the render method as follows:

### Writing styles in external files[](#writing-styles-in-external-files)

We can also write styles in external files outside of the component.

For example, we can move our global styles from the `Layout` component into a separate file as follows:

We can then import the styles back into the `Layout` component:

### One-off global selectors[](#one-off-global-selectors)

The styles that we add to a component using `<style jsx>` affect only the elements inside that component, but not child components.

At times, we may need to override a certain style of a child component. To do this, Styled JSX provides `:global()`, giving access to _one-off global selectors_.

For example, let's say we have a `<Widget>` component that contains a button with the class name `btn`. If we want to change the colors of this button only when the widget is imported on the homepage, we can do so like this:

## Dynamic styles[](#dynamic-styles)

Compared to other solutions, being able to adapt the styling of a component based on its props is a big advantage of `CSS-in-JS` libraries.

With Styled JSX we can do so like this:

If the `Alert` component is passed a `type` prop with a `warning` value like:

the component will have an orange background. Without specifying the type prop, the background would fallback to the default grey color.

Note that we placed the dynamic style into a separate `<style jsx>` tag. This isn't required, but it's **recommended** to split up static and dynamic styles so that only the dynamic parts are recomputed when props change.

An alternate approach to adapting styles based on props is applying different class names based on the prop value as shown below:

## Creating a site theme[](#creating-a-site-theme)

A theme can be a simple object where we include the most common variables we might need in our app:

We then import this theme file in our components and replace _hardcoded_ values with variables:

In this blog post, we covered how to get started with Styled JSX. To learn more about additional features, be sure to [check it out on GitHub](https://github.com/vercel/styled-jsx).