---
title: "Typographic work planner"
source: "https://csswizardry.com/2009/12/typographic-work-planner/"
publishedDate: "2009-12-22"
category: "css"
feedName: "CSS Wizardry"
---

22 December, 2009

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Typographic work planner markup:](#typographic-work-planner-markup)
    1.  [In detail…](#in-detail)
2.  [Typographic work planner CSS:](#typographic-work-planner-css)

No one likes being told what to do, especially if it’s work related, but nevertheless jobs need done. Why present boring stuff in a boring way? If you’re going to be told what to do, at least soften the blow by being told nicely. Enter this, a little HTML/CSS typographic work planner. By using some super-semantic HTML and a dash of CSS you can craft a beautiful looking yet incredibly simple work planner for you and your staff.

## Typographic work planner markup:

The rich, semantic markup is as follows. Notice the use of the more semantic elements and attributes such as `summary=""`, `colgroup`, `scope=""`, `caption` and more…

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />

  <title>Typographic work planner</title>

  <link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body id="home">
  <div id="wrapper">
    <table summary="An overview of upcoming and recently completed work ?
    by employees">
      <caption>Work schedule</caption>
      <colgroup>
        <col id="date" />
        <col id="user" />
        <col id="dec" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">User</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td colspan="3">Sense Internet Ltd work planner</td>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td class="date">20 December, 2009</td>
          <td class="user">Harry Roberts</td>
          <td class="desc">Lorem ipsum dolor sit amet, elit. Nunc ?
          rhoncus dui et mauris. Nam augue felis, dapibus ut, condimentum ?
          in, ornare a, est. Proin sem risus, pretium ut, mattis nec.</td>
        </tr>
        <tr>
          <td class="date">20 December, 2009</td>
          <td class="user">Joe Whitley</td>
          <td class="desc">Suspendisse venenatis. Donec eleifend ?
          dignissim diam. Integer faucibus neque tempor pede. Maecenas at ?
          magna sed lectus adipiscing molestie. Pellentesque habitant morbi ?
          tristique senectus et netuset malesuada fames ac turpis egestas. ?
          Curabitur sodales gravida tellus.</td>
        </tr>
        <tr>
          <td class="date">21 December, 2009</td>
          <td class="user">Harry Roberts</td>
          <td class="desc">Lorem ipsum dolor sit amet, elit. Nunc ?
          rhoncus dui et mauris. Nam augue felis, dapibus ut, condimentum ?
          in, ornare a, est. Proin sem risus, pretium ut, mattis nec.</td>
        </tr>
        <tr>
          <td class="date">21 December, 2009</td>
          <td class="user">Joe Whitley</td>
          <td class="desc">Suspendisse venenatis. Donec eleifend ?
          dignissim diam. Integer faucibus neque tempor pede. Maecenas at ?
          magna sed lectus adipiscing molestie. Pellentesque habitant morbi ?
          tristique senectus et netuset malesuada fames ac turpis egestas. ?
          Curabitur sodales gravida tellus.</td>
        </tr>
        <tr>
          <td class="date">21 December, 2009</td>
          <td class="user">Sam Penrose</td>
          <td class="desc">Lorem ipsum dolor sit amet, elit. Nunc ?
          rhoncus dui et mauris. Nam augue felis, dapibus ut, condimentum ?
          in, ornare a, est. Proin sem risus, pretium ut, mattis nec.</td>
        </tr>
        <tr class="today">
          <td class="date">22 December, 2009</td>
          <td class="user">Joe Whitley</td>
          <td class="desc">Suspendisse venenatis. Donec eleifend ?
          dignissim diam. Integer faucibus neque tempor pede. Maecenas at ?
          magna sed lectus adipiscing molestie. Pellentesque habitant morbi ?
          tristique senectus et netuset malesuada fames ac turpis egestas. ?
          Curabitur sodales gravida tellus.</td>
        </tr>
        <tr class="today">
          <td class="date">22 December, 2009</td>
          <td class="user">Sam Penrose</td>
          <td class="desc">Lorem ipsum dolor sit amet, elit. Nunc ?
          rhoncus dui et mauris. Nam augue felis, dapibus ut, condimentum ?
          in, ornare a, est. Proin sem risus, pretium ut, mattis nec.</td>
        </tr>
        <tr class="today">
          <td class="date">22 December, 2009</td>
          <td class="user">Joe Whitley</td>
          <td class="desc">Suspendisse venenatis. Donec eleifend ?
          dignissim diam. Integer faucibus neque tempor pede. Maecenas at ?
          magna sed lectus adipiscing molestie. Pellentesque habitant morbi ?
          tristique senectus et netuset malesuada fames ac turpis egestas. ?
          Curabitur sodales gravida tellus.</td>
        </tr>
      </tbody>
    </table>
  </div>
  </body>
</html>
```

### In detail…

There are a few things in the table you may not have seen before, briefly, they are:

-   **`summary=""`:** This is an attribute which provides a brief overview of the table and its contents/purpose.
-   **`caption`:** This is a table specific caption, essentially a heading/title explicitly for the table.
-   **`colgroup` and `col`:** This is an essentially invisible element that just adds semantic meaning to the table. It defines the columns and can—in some browsers—be used to style them.
-   **`scope="col"`:** This is an attribute which tells the browser whether the `th` is a title for a column or a row. This then obviously makes the other possible attribute value `row`.
-   **`tfoot`:** This is a table footer and contain pretty much anything you like. It must however appear _before_ the `tbody`.

## Typographic work planner CSS:

The CSS used to create the work planner is pretty basic, with a dash or progressive enhancement added via some CSS3. [View the full CSS file with reset etc.](https://csswizardry.com/demos/typographic-work-planner/css/style.css)

```
table{
  margin-bottom:20px;
}
td,th{
  border-bottom:1px solid #ccc;
}
tbody tr{
  background:#fff;
}
tbody tr:nth-of-type(even){
  background:#ffc;
}
th,tfoot,caption{
  font-family:Helvetica, Arial, Verdana, sans-serif;
  font-size:1.6em;
  font-weight:bold;
}
th,td{
  padding:10px 0;
}
caption{
  font-size:2.4em;
  position:absolute;
  left:-9999px;
}
.date{
  width:160px;
  padding:10px 15px 10px 5px;
  font-family:Georgia, "Times New Roman", Times;
  font-size:1.6em;
  font-style:italic;
}
.user{
  width:460px;
  padding-right:20px;
  font-family:Helvetica, Arial, Verdana, sans-serif;
  font-size:4.8em;
  font-weight:bold;
}
.desc{
  width:280px;
  font-size:1.2em;
}
tbody tr.today{
  background:#ff8;

  text-shadow:1px 1px 1px rgba(0,0,0,0.3);
}
tfoot{
  color:#666;
}
tfoot td{
  padding:10px 5px;
}
```

**[Typographic work planner demo](https://csswizardry.com/demos/typographic-work-planner/)**

* * *

* * *

* * *

![](https://csswizardry.com/img/content/avatar.jpg)

##### By [Harry Roberts](https://csswizardry.com/about/)

Harry Roberts is an [independent consultant](https://csswizardry.com/consultancy/) web performance engineer. He [helps companies](https://csswizardry.com/services/) of all shapes and sizes find and fix site speed issues.

* * *

* * *

![](https://csswizardry.com/img/css/masthead-small.jpg)

Hi there, I’m **Harry Roberts**. I am an **[award-winning](https://web.archive.org/web/20190630140300/https://thenetawards.com/previous-winners/) Consultant Web Performance Engineer**, **designer**, **developer**, **writer**, and **speaker** from the UK. I **[write](https://csswizardry.com/blog/)**, **[Tweet](https://twitter.com/csswizardry)**, **[speak](https://csswizardry.com/speaking/)**, and **[share code](https://github.com/csswizardry)** about measuring and improving site-speed. You [should hire me](https://csswizardry.com/services/).

* * *

#### Connect

-   [𝕏 (Twitter)](https://twitter.com/csswizardry)
-   [Mastodon](https://webperf.social/@csswizardry)
-   [Bluesky](https://bsky.app/profile/csswizardry.com)
-   [LinkedIn](https://www.linkedin.com/in/csswizardry/)
-   [GitHub](https://github.com/csswizardry)
-   [YouTube](https://www.youtube.com/@csswizardry?sub_confirmation=1)

* * *

#### Projects

#### Next Appearance

-   #### Talk
    
    ![](https://csswizardry.com/img/icons/nl.png) [performance.now()](https://perfnow.nl/): Amsterdam (Netherlands), October 2025

I help teams achieve **class-leading web performance**, providing consultancy, guidance, and hands-on expertise.

I specialise in tackling complex, large-scale projects where speed, scalability, and reliability are **critical to success**.

**CSS Wizardry Ltd** is a company registered in England and Wales. **Company No.** 08698093, **VAT No.** 170659396. [License Information](https://csswizardry.com/license/).