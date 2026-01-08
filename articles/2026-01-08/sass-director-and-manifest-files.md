---
title: "Sass Director and Manifest Files"
source: "https://una.im/sass-manifests/"
publishedDate: "2015-01-18"
category: "css"
feedName: "Una Kravets"
---

![](https://una.im/posts/crossing-delaware.jpg)

Published on January 18, 2015

## What is a Manifest File?

When writing Sass, a great way to maintain your code and keep it modular is to split it up into **partials**. Partials are simply Sass files prepended with an underscore, such as `_theme.scss`. They contain a specified portion of your Sass code, and can be @imported without the underscore.

A Sass manifest file, also known as a **main file**, is where a developer pulls together all of those partials, keeping them easy to manage and maintain. It is usually called `main.scss`, but can be named anything, such as `project-name.scss`. This is what will compile into your final CSS file, allowing you to make changes to any of the imported files, with only one cumulative file being output. Hugo Giraudel wrote more about it in his [Sass Guidelines](http://sass-guidelin.es/#main-file), and we’ll use his reference file in our example.

## Sass Director

![](https://una.im/posts/sass-director.svg)

What [Sass Director](http://sassdirector.com/) does is enable a developer to architect an entire project structure within a single manifest file. During the initial setup, instead of manually creating all of the directories and files within them, the outputted shell commands will do the job quickly.

You have a few **options:** to use the .sass or .scss syntax for file endings (.scss is the default), and an option to prepend an underscore to your Sass files to denote them as partials (the default).

When you input your **main.scss** manifest file:

```
@import "utils/variables";
@import "utils/functions";
@import "utils/mixins";
@import "utils/placeholders";

@import "base/reset";
@import "base/typography";

@import "layout/navigation";
@import "layout/grid";
@import "layout/header";
@import "layout/footer";
@import "layout/sidebar";
@import "layout/forms";

@import "components/buttons";
@import "components/carousel";
@import "components/cover";
@import "components/dropdown";

@import "pages/home";
@import "pages/contact";

@import "themes/theme";
@import "themes/admin";
```

The output is a **shell script**:

```
mkdir utils;cd utils;touch _variables.scss;touch _functions.scss;touch _mixins.scss;touch _placeholders.scss;cd ../;mkdir base;cd base;touch _reset.scss;touch _typography.scss;cd ../;mkdir layout;cd layout;touch _navigation.scss;touch _grid.scss;touch _header.scss;touch _footer.scss;touch _sidebar.scss;touch _forms.scss;cd ../;mkdir components;cd components;touch _buttons.scss;touch _carousel.scss;touch _cover.scss;touch _dropdown.scss;cd ../;mkdir pages;cd pages;touch _home.scss;touch _contact.scss;cd ../;mkdir themes;cd themes;touch _theme.scss;touch _admin.scss;cd ../;cd ../;
```

And when you paste that into your **terminal**, it looks a little bit like this:

![Sass Director Demo](https://una.im/posts/sassdirector-demo.gif)

Pretend there’s a main.scss in there too!

> tldr; try out [Sass Director](http://sassdirector.com/) :)