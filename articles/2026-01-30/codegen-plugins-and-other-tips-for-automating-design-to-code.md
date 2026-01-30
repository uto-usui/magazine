---
title: "Codegen plugins (and other tips) for automating design to code"
source: "https://www.figma.com/blog/figma-dev-mode-codegen-plugins/"
publishedDate: "2024-04-11"
category: "design"
feedName: "Figma Blog"
---

**Codegen** is the process of generating code automatically, based on a defined set of rules or specifications.

When we first set out to build [Dev Mode](https://www.figma.com/blog/everything-you-need-to-know-about-dev-mode/)

, streamlining design implementation was our North Star. As we thought about how to incorporate **codegen** into the design-to-code process, we realized that codegen is not a hands-off replacement for translating design to code. Rather, it provides a

[jumping off point

### What codegen is (actually) good for

Should you just use codegen to… generate code? Not so fast. Codegen is best for augmenting your design to development process, not automating it.



](https://www.figma.com/blog/what-codegen-is-actually-good-for/#going-from-0-to-0-5)

, so you don’t have to start from scratch every time.

When you click an object on the Figma canvas, Dev Mode creates automated [code snippets](https://help.figma.com/hc/en-us/articles/15023202277399-Use-code-snippets-in-Dev-Mode) in the inspect panel. You can choose from a dropdown of languages and unit selections.

Many teams with mature design systems have created their own [custom codegen plugins](https://www.figma.com/plugin-docs/codegen-plugins/) to extend Figma’s functionality.

That’s why we’ve included code snippets directly in Dev Mode, while allowing you to extend its functionality with codegen plugins. Whether you’re looking to generate code in HTML or React, or you’re using frameworks like Tailwind or Swift UI, we’ve rounded up plugins that can accelerate your workflows.

#### [Customize code with Anima](#customize-code-with-anima)

[Anima](https://www.figma.com/community/plugin/857346721138427857/anima-figma-to-code-react-html-vue-css-tailwind?searchSessionId=lrzcpq8z-5j1sdjit87s) lets you export Figma-to-code components in React or HTML code with CSS, SCSS, or Tailwind snippets that are interactive, responsive, and easy to maintain. The code automatically detects repeat components to minimize duplication and speed up design implementation.

Pick any Figma layer, component, or frame and get the code right inside Figma. Anima is highly customizable, and as you add code snippets, Anima learns your team conventions and returns relevant code. You can also prompt Anima to add animations or snap a code snippet to specific styles—directly in Dev Mode.

[![A title card for Anima's Figma-to-code solution next to an interface with lines of code.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJklEQVQokS2P20tTAQCH9/+4c87OZefsctTtNB1IuoE51IhpMnDL6Qh66rGHoOxFrIegQmKmLkEtiYKyoKTL0rKcQpSbEmVuc+aF6OWLLR8+fm8f38/mkERcTie604nD4UAUxRqCICAKEqKgIMsa7e3tDA9fJZ1OMz5+j4mJKTKZae5nphkZGaWz8zSaZmCTJAnL7ycUChEOh2lpacHn86GqKoIgYreLKIpK79kYE5PzvHm7Rm7tKxsbG2wWCmxtbbKw8Jx4/zkU2YmtWhUMBon29BCPJ4jFYkQiEUzTrJXW1dWhqCpnehKMXp9ndm6V3No2u+UKB/t7HB0dsrS0zOBgCtmh/hc2NzfT3d1NNBqlr6+vtoFAgGp9VVitjfYmuHHzAbOPPrG6/oPiTom9yi4H+/tks1mSA0PIDu34snWCUFuYtrYQHaciRDoiWH4L2SFjtwuoqpPEwCCPX7ziy/dtfhbLlIplyqUSv/cqZLPvSCaPhdVbhu6h3vTXaKi3ME0fuu5GUXQkUUVTDVKp83xY+cjR3z8cHB5SKu6y86tMaafC68X3DCUvoCoGNkEUUVQdl+HF7fLiMtx43AYuj4nmakRW3Ri6m2QiweKzp2wX8mx+K7Cey5P7nGdlOc9c5iWp/ot49QZsoiShebz4/H4CvgYsy0PrSTdNrUGcTSE0s1ps0tvVyZ0rl3kydoeH41NMpmdI351l7NYM1y7dJt6VxG808g8e/nY4HuSeawAAAABJRU5ErkJggg==)![A title card for Anima's Figma-to-code solution next to an interface with lines of code.](https://cdn.sanity.io/images/599r6htc/regionalized/a588f4ea39341fd46d0198ecc5c1d5639211420e-1732x742.png?w=1732&h=742&q=75&fit=max&auto=format)](https://www.figma.com/community/plugin/857346721138427857/anima-figma-to-code-react-html-vue-css-tailwind)

Use [Anima](https://www.figma.com/community/plugin/857346721138427857/anima-figma-to-code-react-html-vue-css-tailwind) to export Figma-to-code components in React or HTML code with CSS/SCSS/Tailwind snippets.

#### [Leverage code components with Builder](#leverage-code-components-with-builder)

The [Builder](https://www.figma.com/community/plugin/747985167520967365/builder-io-ai-powered-figma-to-code-react-vue-tailwind-more) plugin offers AI-based codegen in languages like React, Svelte, and HTML that looks just like the code a developer would write themselves. By generating code that leverages your team’s code components, it brings design and code closer together. You can chat to refine the code with AI, train it to adapt its output to match your specific code style, and automatically make designs responsive. If you’d like to test code output outside of Figma, Builder has a unique UI that allows you to tinker with generated code in a separate web page.

[![A black title card featuring Builder's AI-powered Figma to code solution.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAACL0lEQVQoka2Pz0/aAACFS1ta+pPSUqBSStECAiIqUBzKcGbGTYPRZNlmlphdli3RaRYPJjvMk4f9Dftjv8VlybKdd3j5Du/lS54gCAL/NZlMBlEUeeS/pSTJKIqKqqooioIsyWSEv3eiKJFVVGRZRpUFBMPIUfQK2LaJKIl/ZLKE5znEjRorSUw9DilXiuhGjoz4W5YRcWyXKExYrTeYtwOEWuzQG8S0ew0qQQlN0xDFDIYts9xy2Uwjxjsxw2lEf1QmWjHQTOnXI1XVqAZ1NjopR8M9bvcPEJKuS7qbcHSyy+nZAf1+CyuvENSz9FODzR2L4cxmNH+Mxfq2TrmmomoKhmmzVI1Ikh7j1pjj7hxhMh3w6u0xl5/fcX31mqezNYoljaipsj4xWRubdIcWqxuPNOmNDKrLOTRDIafp5AsuflAjrDWJww7C7acLvj/cc3Pzgb35gLBaQDdU8gWNIHSoRj5hvUw1LFFZcvErFqatIMkiGVHENAzarYTZkymzdA/hx90b7q8veDbfoVAooCg5NC2PZfl4bpXArxOWl6mWGvheiJOvYOouSlZHFGV812GxP+Hrx3Mevlwi3J1tcjhuUvY8cqqFafj4foNa3Kfd3GKrNWa7lTJupayuDGk0hsS1DYpOnZxi4dg2o07M+8Uu367OEZIgT8HSURUdQ3PxnIgoGtBdm7M9PORluuBscspicsJ06wXrg0P6nedElT6m7pGVc6jZLEXHJKkH/ARirwmhMFqL0gAAAABJRU5ErkJggg==)![A black title card featuring Builder's AI-powered Figma to code solution.](https://cdn.sanity.io/images/599r6htc/regionalized/a390cc98670fdf0cdcb5c4825008730055417ef5-3840x1920.png?w=3840&h=1920&q=75&fit=max&auto=format)](https://www.figma.com/community/plugin/747985167520967365/builder-io-ai-powered-figma-to-code-react-vue-tailwind-more)

#### [Easily go from Figma to Code](#easily-go-from-figma-to-code)

[Figma to Code](https://www.figma.com/community/plugin/842128343887142055/figma-to-code-html-tailwind-flutter-swiftui), a free open source plugin from the Figma Community, allows you to convert designs into code for responsive websites (HTML or Tailwind) or mobile applications (Flutter or SwiftUI). You can run the plugin, see Tailwind code, and then copy and paste it into your code editor.

[![Mobile prototypes on the Figma canvas.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAADCUlEQVQokT2T7W9TZRjG+78wt3a2p69nK9053VtjxAwlMZIljA+KybJBrNHIAA3YpbW2yxwGEg0iRoOCbB0DP2iCJCbGoHNsdJvbur6ctqcvpy+s4j/wM31q/HAl5znn5Hdf133fj8nhP4LNF8DnH+at4Nt88+0tEiv3uZO4y53lFRaXV1hauU/i3g8s3b0n3t9eTAh9fXuZmdk4gSNjuFxOHA4HJk+/D7vLg+L3E/4oylpyi0yhxH6uwL5WJN1WvqNMXmc7leanBw/56uZNrlz/guC5GUYCAVxOJ06nE5PH48EuSaiqSnz+E/ayGsbBMyrNvyk3W1SaLXE2nj6j3vpHfL/25Q1OTU9yfPIkRydeZXB0GK/3MH19fZjcbjc2m4SiKETjcyR39siXDbRyjaxeFSpUG+QrdbRSnT/WN4lEY4xPnODN4DTBC+8RfPcdTkycFAyTR5aRJImBAYVwNMb65g5aqQPUBNgQwEzRYDdX4bfVJJGP40ydPsPlK1e5tZjgu++XuBSaZWRkBJMsyyKyzzfAh7MR4SBbrJL7H1oT7tKFqgA+WtsShY+PjzM5Nc3Z8xeYOf8+r79xCkVRMR0eGMTl8aIOBgiFYx2gXiVTrJLSyuznK2R1g3S+LPTnk21C4QiKX0Vy2nG4nbg8btpJxVD8o8fwqi8x+uJrhGOfsrq+SU6vCOBerkxKq5DRDVK5opj66kaSi6EQcr9MV88husyHeM7cheV5M71WCyaf+gKe/iGGAmNEYgusPdn6byh10qU6mVKDfLVBtth2qPP74w0+uHgJWXZj7u3CInVjtndjcfRgsfe0e9iHJNlRFD/R2Bxbe2kqjQP0+gFZo0W22qLUaFGqNdGNBsm/dpmbX+Do2BhDwypeRcbqtGBug63dnT2UbLbO2sTibGzvCIe60aRgPEWrNMRzu0hb7dg/PnjItes3mF+4zNSZ06KfvdZezJaezh7a2w5VVTT7519+5XFyW9yWQrkmYmYLZeGuXGuK6LsZjVQ2L/67+tnnvPzKMTEQq9XKvwaMjL23VcQbAAAAAElFTkSuQmCC)![Mobile prototypes on the Figma canvas.](https://cdn.sanity.io/images/599r6htc/regionalized/a110121fd6a5f4cd7534b0066a57a9b5da915de9-2782x1710.png?w=2782&h=1710&q=75&fit=max&auto=format)](https://www.figma.com/community/plugin/842128343887142055/figma-to-code-html-tailwind-flutter-swiftui)

Check out [Figma to Code](https://www.figma.com/community/plugin/842128343887142055/figma-to-code-html-tailwind-flutter-swiftui), a free, open source plugin from the Figma Community.

#### [Create code across mobile and web with Locofy.ai](#create-code-across-mobile-and-web-with-locofy-ai)

Available in free beta, [Locofy.ai](https://www.figma.com/community/plugin/1056467900248561542/locofy-lightning-figma-to-code-in-1-click-free-beta) generates interactive code—in React, HTML/CSS, Next.js, Gatsby, and Vue—for components and full screens across web and mobile apps. Locofy.ai combines multiple aspects of front end development to create high quality code:

-   Design optimizations like auto layout and frame grouping
-   Interactivity with tagging semantic HTML elements, libraries, and actions
-   Responsiveness across different screen sizes
-   Components and props for cleaner modular code
-   Contextual human-readable class names in code for better collaboration and scalability

After fine-tuning the code, designers and developers can collaborate and share prototypes, bind data, and export code or Storybook files. Developers can also sync directly to GitHub with automatic code merge and conflict resolution for continuous integration.

[![A blue title card featuring Locofy's design to code solution with a lightning bolt.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACGklEQVQokXWTS09TURSF74/ztrcPKKUFK48OhERUHiagDLS0paVvoaU2pW2oFgLGBBPRxDg0zvwbDBiQ6JTQ0vWZ29uEJurgy16jtffZex3jXgz+yZYwt8AcVAdXSlh5YZXucBeEKyPMhDBjYHgSEMpCpAihHHiSoyYjOiE8RRE8FFOnInQigkci8FZ4KsLcHhoGM7DahPgprLdhbhcmsxri6GBW+LPCVxFTJ2Lus4h8EuEzETwV3pow005jI5gRay2R+iAS78V6W6w0xWpTrDXF8oFYqIrp18K/J0IdET0X0S/i/pkIHAnPG2Haz44LYywFC1XYaMNmB168G9KB58ew3IbZPRjPCk9BTDTEo3MR+y42vonpY2HtDw0TwvCnxMN9Z8qnDbFUF08Obllq9Fg87BFt3TJREp6M8JbERE08+yhaP0X5h4geCassXDlnj0ZgR6wc9NjsdFls9InWukTLv5kvXDJbuCSc/4U/08VfgFBVROri8bHY+Spi52K2JXxl59r2Ho3xtFiq9VhpdZmp9gmXu0zmrggnL5h6dYH/5RXuxA2+PIQqIlKDmTrMN+BBHSYrMLbrrGNg6I6LsZSwJ/XaOdvuDwysrWus2DWu2A1m4hYrI/wFESjCeNHRvrzw5sDKCVfWNuxj/D/Yd9jXcyWF226YBittVwd3ikHgBzlMCmP0J/xFbIit4wyu6Bpg61GcyNg5/AN6pHVPOdw4WAAAAABJRU5ErkJggg==)![A blue title card featuring Locofy's design to code solution with a lightning bolt.](https://cdn.sanity.io/images/599r6htc/regionalized/49b3d4f0c9e4b4312176f54bb3756d8efa96ccba-1920x1080.png?w=1920&h=1080&q=75&fit=max&auto=format)](https://www.figma.com/community/plugin/1056467900248561542/locofy-lightning-figma-to-code-in-1-click-free-beta)

Learn more about [Locofy](https://www.figma.com/community/plugin/1056467900248561542/locofy-lightning-figma-to-code-in-1-click-free-beta), currently in free beta.

#### [Turn designs into React components with Replit](#turn-designs-into-react-components-with-replit)

The [Replit](https://www.figma.com/community/plugin/1326990370920029683/figma-to-replit) plugin turns Figma designs into high-fidelity prototypes. You can convert your design system directly to React, iterate on your designs using natural language prompts, and wire the generated code up to live data for user testing.

[![The Replit and Figma logo in front of an abstracted image of lines of code.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAcEBgj/xAAlEAABBAECBQUAAAAAAAAAAAABAgMEBQAGEQcIEhQxEyFBYXH/xAAWAQEBAQAAAAAAAAAAAAAAAAAGAgP/xAAcEQACAgMBAQAAAAAAAAAAAAABAgADBBEhEmH/2gAMAwEAAhEDEQA/AKpy9adh6yiXKbsypDcfo9Nttwp848qzh1pusUX2IEhC2UFQU4vq+MV/Jv4vvxvNLSAO3cGw26Tm6ZFqnjHv2Q1KMOgRE2+nam4l9248ttSkhOw+sMg2pKLKSlJKUhw7Ae2GMkobyNORDbZA2drP/9k=)![The Replit and Figma logo in front of an abstracted image of lines of code.](https://cdn.sanity.io/images/599r6htc/regionalized/3582a768cd2b113ffc9657b4c4e9f8986d5cf728-3840x1920.jpg?w=3840&h=1920&q=75&fit=max&auto=format)](https://www.figma.com/community/plugin/1326990370920029683)

Use [Replit](https://www.figma.com/community/plugin/1326990370920029683) to turn designs into high fidelity prototypes.

See the full list of [plugins](https://www.figma.com/community/category/development/plugins/devmode) to find one that supports the languages and frameworks you use, and learn more about [working with plugins in Dev Mode](https://www.figma.com/plugin-docs/working-in-dev-mode/#plugins-for-dev-mode).