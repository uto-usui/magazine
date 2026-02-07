---
title: "React Native 0.77 - New Styling Features, Android’s 16KB page support, Swift Template"
source: "https://reactnative.dev/blog/2025/01/21/version-0.77"
publishedDate: "2025-01-21"
category: "frontend"
feedName: "React Native Blog"
---

Today we are excited to release React Native 0.77!

This release ships several features: new styling capabilities such as support for `display: contents`, `boxSizing`, `mixBlendMode`, and `outline`\-related properties to provide a more powerful layout options; Android 16KB page support to be compatible with the newer Android devices. We are also modernizing the community template by migrating it to Swift, while continuing to support and maintain compatibility with Objective-C for developers who prefer it.

### Highlights[​](#highlights "Direct link to Highlights")

-   [New CSS Features for better layouts, sizing and blending](#new-css-features-for-better-layouts-sizing-and-blending)
-   [Android version 15 support & 16KB page support](#android-version-15-support--16kb-page-support)
-   [Community CLI and Template Updates](#community-cli-and-template-updates)

### Breaking Changes[​](#breaking-changes "Direct link to Breaking Changes")

-   [Removal of `console.log()` streaming in Metro](#removal-of-consolelog-streaming-in-metro)

## Highlights[​](#highlights-1 "Direct link to Highlights")

### New CSS Features for better layouts, sizing and blending[​](#new-css-features-for-better-layouts-sizing-and-blending "Direct link to New CSS Features for better layouts, sizing and blending")

React Native 0.77 furthers our goal of aligning React Native with the web. We've added support for new CSS properties to give you more control over your app's layout, sizing, and blending. These changes can help simplify complex layouts, add texture, and make your app more accessible.

#### Simpler layouts with `display: contents`[​](#simpler-layouts-with-display-contents "Direct link to simpler-layouts-with-display-contents")

The [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#display_contents) prop allows an element to disappear from the layout structure while its children are still rendered as if they were direct children of the parent element. It can be useful for styling purposes where you want to apply styles to child elements without affecting the layout, when building wrapper components which must handle events, or if you need to interact with the ShadowTree.

Technically speaking, `display: contents` renders an element without generating a layout box, but it preserves the layout boxes of the element’s children. The element with `display: contents` is effectively flattened out of the view hierarchy.

Let’s have a look at this example where we want to display an alert when a widget is pressed. We have a red `Widget` inside of a container view:

Container.jsx

```
function Container() {  return (    <View style={styles.container}>      <Widget />    </View>  );}
```

![display contents - setup](data:image/png;base64,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)

Now, let's build a new `Alerting` wrapper component, with the goal of alerting the user when a component beneath it is pressed, using [experimental pointer events](https://reactnative.dev/blog/2022/12/13/pointer-events-in-react-native). For clarity, the background of this component is made blue. That might look something like the component below:

Container.jsx

```
function Alerting({children}) {  return (    <View      style={{backgroundColor: 'blue'}}      onPointerDown={() => alert('Hello World!')}>      {children}    </View>}function Container() {  return (    <View style={styles.container}>      <Alerting>        <Widget />      </Alerting>    </View>  );}
```

This doesn’t do quite what we want it to. `Alerting` adds a new layout box, with its own bounds, separate from the child `Widget`. Depending on the styling of the element it is wrapping, this may result in significant visual and functional changes. In this example, the blue background responds to taps with an alert when we want for only the red "Hello World" box to alert when tapped.

![before display contents](https://reactnative.dev/assets/images/0.77-display-contents-2-593d0e47100de84ddad130e44df8e29b.gif)

If we try this again, while setting `display: contents` on the `View` wrapper of `Alerting`, we only see alerts when the user presses within the original bounds of the `Widget`. This is because `Alerting` no longer adds its own box, but can still observe the pointer events bubbled from `Widget`.

Container.jsx

```
function Alerting({children}) {  return (    <View      style={{display: 'contents'}}      onPointerDown={() => alert('Hello World!')}>      {children}    </View>  );}// ... function Container ...
```

![after display contents](https://reactnative.dev/assets/images/0.77-display-contents-3-84116bf7857e21e84bca5890a2d9e00c.gif)

#### Box sizing[​](#box-sizing "Direct link to Box sizing")

The `boxSizing` prop defines how the element's various sizing props (`width`, `height`, `minWidth`, `minHeight`, etc.) are computed. If `boxSizing` is `border-box`, these sizes apply to the border box of the element. If it is `content-box` they apply to the content box of the element. The default value is `border-box`, this is different from the default value on the web. The [web documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) is a good source of information if you wish to learn more about how this prop works.

warning

`border-box` has been the default forever at this point, and has been the only `boxSizing` value up until we added `content-box`. Changing the default would have been a breaking change that would suddenly break several layouts. We decided to keep `border-box` as default value to ensure backward compatibility.

To understand the difference between `border-box` and `content-box`, have a look at these example, where both `View`s have `padding: 20` and `borderWidth: 10`. When using `border-box`, we consider border and padding for the sizing; when using `content-box`, we consider only the content for the sizing.

![after display contents](https://reactnative.dev/assets/images/0.77-border-box-cfc6104410ab403e0f7b4809fb2087fe.png)

#### CSS mixBlendMode[​](#css-mixblendmode "Direct link to CSS mixBlendMode")

The `mixBlendMode` prop lets you control how an element blends its colors with the other elements in its **stacking context**. Check out the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) for a full overview of each blending function.

To help have more granular control about what is blending together, we also added the `isolation` property. Setting `isolation: isolate` on a `View` will force it to form a **stacking context**. So, you can set this on some ancestor `View` to ensure that some descendent `View` with `mixBlendMode` does not blend beyond the **isolated** `View`.

##### mixBlendMode Values[​](#mixblendmode-values "Direct link to mixBlendMode Values")

-   `normal`: The element is drawn on top of its background without blending.
-   `multiply`: The source color is multiplied by the destination color and replaces the destination.
-   `screen`: Multiplies the complements of the backdrop and source color values, then complements the result.
-   `overlay`: Multiplies or screens the colors, depending on the backdrop color value.
-   `darken`: Selects the darker of the backdrop and source colors.
-   `lighten`: Selects the lighter of the backdrop and source colors.
-   `color-dodge`: Brightens the backdrop color to reflect the source color. Painting with black produces no changes.
-   `color-burn`: Darkens the backdrop color to reflect the source color. Painting with white produces no change.
-   `hard-light`: Multiplies or screens the colors, depending on the source color value. The effect is similar to shining a harsh spotlight on the backdrop.
-   `soft-light`: Darkens or lightens the colors, depending on the source color value. The effect is similar to shining a diffused spotlight on the backdrop.
-   `difference`: Subtracts the darker of the two constituent colors from the lighter color.
-   `exclusion`: Produces an effect similar to that of the Difference mode but lower in contrast.
-   `hue`: Creates a color with the hue of the source color and the saturation and luminosity of the backdrop color.
-   `saturation`: Creates a color with the saturation of the source color and the hue and luminosity of the backdrop color.
-   `color`: Creates a color with the hue and saturation of the source color and the luminosity of the backdrop color. This preserves the gray levels of the backdrop and is useful for coloring monochrome images or tinting color images.
-   `luminosity`: Creates a color with the luminosity of the source color and the hue and saturation of the backdrop color. This produces an inverse effect to that of the Color mode.

![blend mode](https://reactnative.dev/assets/images/0.77-blend-mode-434273fec000ab313596eb9c0b4c856b.png)

#### Outline props[​](#outline-props "Direct link to Outline props")

We’ve also introduced `outlineWidth`, `outlineStyle`, `outlineSpread` and `outlineColor`. These outline props work very similar to the respective `border` props, but it is rendered around the **border box** as opposed to around the **padding box**. These props allow to highlight elements by drawing their outline without affecting their layout.

Check out the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/outline) for more details.

![outline props](https://reactnative.dev/assets/images/0.77-outline-props-4f2aec2904024a80275f98a9f2bb7b92.png)

### Android version 15 support & 16KB page support[​](#android-version-15-support--16kb-page-support "Direct link to Android version 15 support & 16KB page support")

#### Forced edge-to-edge on Android 15[​](#forced-edge-to-edge-on-android-15 "Direct link to Forced edge-to-edge on Android 15")

We’ve already done some work to support Android 15 on the prior release. One of the noticeable changes in Android 15 is forced edge-to-edge display when you build apps with `targetSdk` 35.

If you have not looked into this yet, please refer to our prior [recommendation](https://github.com/react-native-community/discussions-and-proposals/discussions/827) on how this should be handled as ignoring this can potentially break your UI in the app.

#### 16 KB page size support for Android[​](#16-kb-page-size-support-for-android "Direct link to 16 KB page size support for Android")

Android 15 introduces support for 16KB memory page size enabling [performance improvements](https://developer.android.com/guide/practices/page-sizes#benefits) for apps and more, but making previous 4KB-based apps potentially incompatible on future devices; it's currently an opt-in feature for developers to test on select devices to prepare for 16 KB page size being the OS default.

With the 0.77 release, React Native is ready to fully support 16 KB page size and developers will be able to test and ship apps for 16 KB devices using it.

Please refer to [the official Android Developers site](https://developer.android.com/guide/practices/page-sizes) for further information on 16 KB support.

### Community CLI and Template Updates[​](#community-cli-and-template-updates "Direct link to Community CLI and Template Updates")

This version fully completes the deprecation of the `react-native init` command that was [introduced in React Native 0.75](https://reactnative.dev/blog/2024/08/12/release-0.75#sunsetting-react-native-init).

As a reminder, you won’t be able to use the `react-native init` command anymore, but you’ll have to either:

-   [Use a framework](https://reactnative.dev/blog/2024/06/25/use-a-framework-to-build-react-native-apps) such as Expo, with its own dedicated command to create a new project: `npx create-expo-app`
-   Invoke the Community CLI directly with `npx @react-native-community/cli init`

#### Community CLI: Removal of "run on iOS/Android" key handlers from Metro[​](#community-cli-removal-of-run-on-iosandroid-key-handlers-from-metro "Direct link to Community CLI: Removal of \"run on iOS/Android\" key handlers from Metro")

In this version, we removed the ‘a’ and ‘i’ keyboard shortcuts from Metro. Those shortcuts were used to invoke the `run-android` & `run-ios` community CLI commands. Those keyboard shortcuts provided worse developer experience and were rarely used. Moreover, we believe that frameworks are better suited to orchestrate the terminal outputs.

You can read more about this change [in this dedicated post](https://github.com/react-native-community/discussions-and-proposals/discussions/821).

info

Projects using Expo should not be affected by this change.

This change let us slim down the community template by replacing three files (`main.m`, `AppDelegate.h` and `AppDelegate.mm`) with a single, new [`AppDelegate.swift`](https://github.com/react-native-community/template/blob/main/template/ios/HelloWorld/AppDelegate.swift).

This is technically a breaking change: you’ll see the change from Objective-C to Swift in the upgrade helper like this:

![Swift Upgrade Helper](https://reactnative.dev/assets/images/0.77-swift-upgrade-helper-abe4ca2c5be24c5d4f7612250042b077.png)

You don’t have to migrate to Swift: the Objective-C++ variant of the iOS community template is still supported (note that you still need to integrate the [`RCTAppDependencyProvider`](#rctappdependencyprovider)). New projects will be generated by using Swift as the iOS app language, although you can always migrate back to Objective-C if you need to.

##### Limitations[​](#limitations "Direct link to Limitations")

If your app has some local modules that are written in C++, you would not be able to register them in Swift as shown in [this guide](https://reactnative.dev/docs/next/the-new-architecture/pure-cxx-modules#3-registering-the-cxx-turbo-native-module-in-your-app).

If your app falls in this category, please skip the migration of the AppDelegate to Swift, and keep using Objective-C++ for your app.

React Native core is mostly developed using C++ to encourage code sharing between iOS and Android and other platforms. The interoperability between Swift and C++ is not mature nor stable, yet. We are looking into ways to fill this gap and let you migrate to Swift too.

##### RCTAppDependencyProvider[​](#rctappdependencyprovider "Direct link to RCTAppDependencyProvider")

React Native 0.77 slightly changes how the app loads third party dependencies. This is a new line in the community template that, if missed, can cause some runtime issues. Make sure to add it to your app.

The equivalent Objective-C lines are the following:

AppDelegate.mm

```
#import "AppDelegate.h"#import <React/RCTBundleURLProvider.h>#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>@implementation AppDelegate- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions{  self.moduleName = @"<Your app Name>";  self.dependencyProvider = [RCTAppDependencyProvider new];  // You can add your custom initial props in the dictionary below.  // They will be passed down to the ViewController used by React Native.  self.initialProps = @{};  return [super application:application didFinishLaunchingWithOptions:launchOptions];}// remaining of the AppDelegate
```

## Breaking Changes[​](#breaking-changes-1 "Direct link to Breaking Changes")

### Removal of `console.log()` streaming in Metro[​](#removal-of-consolelog-streaming-in-metro "Direct link to removal-of-consolelog-streaming-in-metro")

We want every aspect of React Native debugging to behave reliably and to match the functionality of modern browser tooling. To meet this quality bar, log forwarding via Metro, originally deprecated in 0.76, is removed in 0.77.

This integration relied on a custom approach to communicate with the debugging target on device. With this change, we are moving exclusively to the Chrome DevTools Protocol (CDP).

-   To view JS logs, please use [React Native DevTools](https://reactnative.dev/docs/react-native-devtools) and its fully featured Console panel — supporting log filtering, rich object inspection, Live Expressions, and more.
-   You can also connect VS Code as a CDP debugger, via third party extensions such as [Expo Tools](https://github.com/expo/vscode-expo) and [Radon IDE](https://ide.swmansion.com/).
    -   Please note that these integrations are not directly supported by the React team. However, we are working on first party VS Code support in 2025.
-   Expo continues to offer log streaming in Expo CLI.

For more info, see [_Why are JavaScript logs leaving Metro?_](https://github.com/react-native-community/discussions-and-proposals/discussions/819#:~:text=Why%20are%20JavaScript%20logs%20leaving%20Metro%3F)

### Other Breaking Changes[​](#other-breaking-changes "Direct link to Other Breaking Changes")

#### General[​](#general "Direct link to General")

-   Animation
    -   Native looping animation do not send a React state update every time the loop ends.
-   Layout
    -   `position` of sticky headers on `ScrollView` will now be taken into account.
    -   Absolute positioning is now behaving in a more compliant way
-   JS Modules:
    -   Remove `ReactFabricInternals` module
        -   This is not going to be accessible anymore
-   Native Modules
    -   `NativeModules` object can now be used to load turbomodules in JS .
        -   This improves compatibility between Native Modules and Turbo Native Modules
-   Packages
    -   dev-middleware: Frameworks should specify `serverBaseUrl` relative to the middleware host
-   API Changes:
    -   Removed type for `useConcurrentRoot` from `AppRegistry`, as it was already ignored
    -   Removed `refs` property from `NativeMethods` TypeScript definition.
-   UX Changes:
    -   Remove "run on iOS" and "run on Android" from the dev server key commands

#### Android[​](#android "Direct link to Android")

-   Kotlin
    -   This is the first version of React Native that builds against Kotlin 2.0.21. You can read more about the changes coming with Kotlin 2.0 on the [language release notes](https://kotlinlang.org/docs/whatsnew2020.html).
-   API Changes:
    -   Nullability:
        -   Non-primitive getters in `ReadableArray` are now correctly typed as optional
        -   Make `ReactHost.createSurface()` method non nullable
    -   Renamed:
        -   `DevSupportManagerBase.getCurrentContext()` to `DevSupportManagerBase.getCurrentReactContext()`

Additionally, several APIs have been removed or restricted in visibility, so they can’t be accessed anymore. Those APIs were internal and not needed to React Native developers directly. You can find the full list below:

List of Removed Android APIs:

The following packages are now internal and can’t be accessed anymore:

-   `com.facebook.react.views.progressbar`
-   `com.facebook.react.views.safeareaview`
-   `com.facebook.react.modules.accessibilityinfo`
-   `com.facebook.react.modules.appstate`
-   `com.facebook.react.modules.clipboard`
-   `com.facebook.react.modules.devmodule`
-   `com.facebook.react.modules.reactdevtoolssettings`
-   `com.facebook.react.views.unimplementedview`

The following classes are now either internal or have been removed, so can’t be accessed anymore:

-   `BackHandler.removeEventListener`
-   `BaseViewManagerInterface`
-   `BindingImpl`
-   `CompositeReactPackage`
-   `DebugOverlayTags`
-   Method `create()` from `DefaultDevSupportManagerFactory`
-   `DevToolsReactPerfLogger`
-   `FabricComponents`
-   `ImageStoreManager`
-   `InteropModuleRegistry`
-   `NativeModulePerfLogger`
-   `NoopPrinter`
-   `NotThreadSafeViewHierarchyUpdateDebugListener`
-   `OkHttpCallUtil`
-   `PrinterHolder`
-   `Printer`
-   `ReactDebugOverlayTags`
-   `ReactNativeFlipper`
-   `ReactViewBackgroundManager`
-   `ReactViewGroup.getBackgroundColor()`
-   `ReactVirtualTextShadowNode`
-   `ReactVirtualTextViewManager`
-   `SimpleSettableFuture`
-   `SwipeRefreshLayoutManager`
-   `TaskCompletionSource`
-   Parameter `jsBundleLoader` from DefaultReactHost.getDefaultReactHost()

#### iOS[​](#ios "Direct link to iOS")

-   API Changes
    -   Removed
        -   `RCTConstants.RCTGetMemoryPressureUnloadLevel`
        -   `partialBatchDidFlush`
        -   `RCTRuntimeExecutor`
        -   `UseNativeViewConfigsInBridgelessMode`
            -   Replaced by a proper feature flag
        -   `UseTurboModuleInteropForAllTurboModules`
            -   Interop layer is always on for TMs
    -   Changed
        -   Replace uses of `CGColorRef` with `UIColor`
-   `RCTAppDelegate` now requires to use the `RCTDependencyProvider` to load third party dependencies
-   CocoaPods sets C++ version for all the 3rd party dependencies to avoid compilation issues.

**React 19?**

React 19 was released the 6th of December 2024. At the time, we already cut the branch for React Native 0.77 and we already released three RCs for React Native 0.77. It was too late in the release of React Native 0.77 to introduce React 19 in this release.

React 19 will be shipped in React Native 0.78, and we already cut the branch for this version. You can try it by creating a new app with the command:

```
npx @react-native-community/cli init YourReact19App --version 0.78.0-rc.0
```

## Acknowledgements[​](#acknowledgements "Direct link to Acknowledgements")

React Native 0.77 contains over **1061** commits from **161** contributors. Thanks for all your hard work!

Thanks to all the additional authors that worked on documenting features in this release post:

-   [Jakub Piasecki](https://github.com/j-piasecki) for contributing to the `display: contents` feature
-   [Nick Gerleman](https://github.com/NickGerleman), [Joe Vilches](https://github.com/joevilches) and [Jorge Cabiedes Acosta](https://github.com/jorge-cab) for releasing the new styling features
-   [Alan Lee](https://github.com/alanleedev) for the Android 16Kb page support content
-   [Riccardo Cipolleschi](https://github.com/cipolleschi) and [Oskar Kwaśniewski](https://github.com/okwasniewski) for supporting the migration of the template to Swift
-   [Nicola Corti](https://github.com/cortinico) for the `react-native init` deprecation cycle content
-   [Alex Hunt](https://github.com/huntie) for the content on the removal of `console.log` from metro

### Upgrade to 0.77[​](#upgrade-to-077 "Direct link to Upgrade to 0.77")

Please use the [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) to view code changes between React Native versions for existing projects, in addition to the Upgrading docs.

To create a new project:

```
npx @react-native-community/cli@latest init MyProject --version latest
```

If you use Expo, React Native 0.77 will be supported in Expo SDK 52 (instructions on how to update React Native inside your Expo project to 0.77.0 will be available in a separate Expo blog post in the near future).

info

0.77 is now the latest stable version of React Native and 0.74.x moves to unsupported. For more information see [React Native's support policy](https://github.com/reactwg/react-native-releases/blob/main/docs/support.md#releases-support-policy). We aim to publish a final end-of-life update of 0.74 in the near future.