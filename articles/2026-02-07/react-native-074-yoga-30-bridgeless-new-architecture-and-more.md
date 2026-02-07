---
title: "React Native 0.74 - Yoga 3.0, Bridgeless New Architecture, and more"
source: "https://reactnative.dev/blog/2024/04/22/release-0.74"
publishedDate: "2024-04-22"
category: "frontend"
feedName: "React Native Blog"
---

Today we're releasing React Native 0.74! This release adds Yoga 3.0, Bridgeless by default under the New Architecture, batched `onLayout` updates (New Architecture), and Yarn 3 as the default package manager for new projects.

We are also removing deprecated APIs, with the removal of `PropTypes` and breaking changes to `PushNotificationIOS`. On Android, SDK 23 (Android 6.0) is now the minimum supported version.

### Highlights[​](#highlights "Direct link to Highlights")

-   [Yoga 3.0](https://reactnative.dev/blog/2024/04/22/release-0.74#yoga-30)
-   [New Architecture: Bridgeless by Default](https://reactnative.dev/blog/2024/04/22/release-0.74#new-architecture-bridgeless-by-default)
-   [New Architecture: Batched `onLayout` Updates](https://reactnative.dev/blog/2024/04/22/release-0.74#new-architecture-batched-onlayout-updates)
-   [Yarn 3 for New Projects](https://reactnative.dev/blog/2024/04/22/release-0.74#yarn-3-for-new-projects)

### Breaking Changes[​](#breaking-changes "Direct link to Breaking Changes")

-   [Android Minimum SDK Bump (Android 6.0)](https://reactnative.dev/blog/2024/04/22/release-0.74#android-minimum-sdk-bump-android-60)
-   [API Changes to PushNotificationIOS (Deprecated)](https://reactnative.dev/blog/2024/04/22/release-0.74#api-changes-to-pushnotificationios-deprecated)
-   [Removal of Deprecated `PropTypes`](https://reactnative.dev/blog/2024/04/22/release-0.74#removal-of-deprecated-proptypes)
-   [Removal of Flipper React Native Plugin](https://reactnative.dev/blog/2024/04/22/release-0.74#removal-of-flipper-react-native-plugin)
-   [Other Breaking Changes](https://reactnative.dev/blog/2024/04/22/release-0.74#other-breaking-changes)

## Highlights[​](#highlights-1 "Direct link to Highlights")

### Yoga 3.0[​](#yoga-30 "Direct link to Yoga 3.0")

#### New Layout Behaviors[​](#new-layout-behaviors "Direct link to New Layout Behaviors")

React Native 0.74 includes [Yoga 3.0](https://yogalayout.dev/blog/announcing-yoga-3.0), the newest version of our layout engine. Yoga 3.0 improves layout by making styling more predictable, and supports rendering components written for the web.

React Native continues to intentionally preserve some incorrect layout behaviors, where fixing them was found to effect a significant number of real-world components. Layout conformance will be able to be configured more granularly in future versions of React Native.

warning

React Native [previously flipped](https://yogalayout.dev/blog/announcing-yoga-3.0#correct-handling-of-logical-edges-in-row-reverse-containers) `left`/`right` (and `start`/`end`) edges when dealing with `margin`, `padding`, or `border`, set on a `row-reverse` container. Now, behavior of these properties lines up with web. Code which previously relied on edges being inverted may need to be updated to continue rendering correctly.

Style

Before

After

```
<View  style={{    flexDirection: 'row',    backgroundColor: 'red',    margin: 10,    width: 200,    height: 100,  }}>  <View    style={{      flexDirection: 'row-reverse',      backgroundColor: 'blue',      flex: 1,      marginLeft: 50,    }}>    <View      style={{        backgroundColor: 'green',        height: '50%',        flex: 1,        marginLeft: 50,      }}    />  </View></View>
```

![Previous layout](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkAgMAAAC+6JeYAAAACVBMVEX/AAAAgAIAAP/8wXIfAAAANklEQVR42u3LoQ0AIAwAsJ2I4T8MhiuxM8v0ktY3XnJ3YUWmKIqiKIqiTCy9oyiKoiiKoowuHxexOPfpM7ojAAAAAElFTkSuQmCC)

![New layout](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkAgMAAAC+6JeYAAAACVBMVEX/AAAAgAIAAP/8wXIfAAAAMklEQVR42u3LoQ0AMAgAsOn9x5NcicUQNEnr+7qfTUwURVEURVGU+2WnKIqiKIqinCsFTv3+UKPaRfkAAAAASUVORK5CYII=)

#### Support for `align-content: 'space-evenly'`[​](#support-for-align-content-space-evenly "Direct link to support-for-align-content-space-evenly")

Yoga 3.0 brings support for [`alignContent: 'space-evenly'`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content#space-evenly). `space-evenly` distributes the lines in a multi-line flex container using evenly spaced gaps, placed between line and container edges.

![Visual reference for alignContent behaviors](https://reactnative.dev/blog/assets/0.74-align-content.png)

Source: [World Wide Web Consortium](https://www.w3.org/TR/css-align-3/#distribution-values)

#### Support for `position: 'static'`[​](#support-for-position-static "Direct link to support-for-position-static")

info

`position: 'static'` is supported only in the New Architecture.

Elements marked as [`position: 'static'`](https://developer.mozilla.org/en-US/docs/Web/CSS/position#static) may not be offset, and are not considered when determining the [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block) of an absolutely positioned element. This allows positioning an element relative to an ancestor which is not its direct parent.

```
<View  style={{    backgroundColor: 'blue',    width: 200,    height: 200,    flexDirection: 'row-reverse',  }}>  <View    style={{      backgroundColor: 'red',      width: 100,      height: 100,      position: 'static',    }}>    <View      style={{        backgroundColor: 'green',        width: 25,        height: '25%',        left: 25,        top: 25,        position: 'absolute',      }}    />  </View></View>
```

![Static Example](data:image/png;base64,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)

Notice how the green `<View>` declares `left` and `top` and it is positioned relative to the blue `<View>`, not its parent.

React Native continues to default to `position: 'relative'` when no `position` is set.

### New Architecture: Bridgeless by Default[​](#new-architecture-bridgeless-by-default "Direct link to New Architecture: Bridgeless by Default")

In this release, we are making Bridgeless Mode the default when the New Architecture is enabled. You can learn more about our switch to Bridgeless as the default in [this post](https://github.com/reactwg/react-native-new-architecture/discussions/174). To make the transition smoother we enhanced the interop layers to cover Bridgeless and worked with several libraries to make sure they will work in Bridgeless from day one.

Bridgeless is not the only interop layer we worked on: we improved the New Renderer Interop layers too. The most exciting bit is that it is now enabled by default: you don't need to specify the components that have to go through it! You can read more about them [here](https://github.com/reactwg/react-native-new-architecture/discussions/175).

Finally, if you want to learn more about the New Architecture, you can find documentation in the [react-native-new-architecture](https://github.com/reactwg/react-native-new-architecture/tree/main/docs) repo. When the New Architecture becomes the default, this information will be incorporated into [reactnative.dev](https://reactnative.dev/).

### New Architecture: Batched `onLayout` updates[​](#new-architecture-batched-onlayout-updates "Direct link to new-architecture-batched-onlayout-updates")

State updates in `onLayout` callbacks are now batched. Previously, each state update in the `onLayout` event would result in a new render commit.

```
function MyComponent(props) {  const [state1, setState1] = useState(false);  const [state2, setState2] = useState(false);  return (    <View>      <View        onLayout={() => {          setState1(true);       }}>      <View         onLayout={() => {          // When this event is executed, state1's new value is no longer observable here.          setState2(true);        }}>      </View>    </View>  );}
```

In 0.74, `setState1` and `setState2` updates are batched together. This change is [expected behavior in React](https://react.dev/learn/queueing-a-series-of-state-updates#react-batches-state-updates) and allows for less re-renders.

danger

This change **may break code** that has relied on un-batched state updates. You'll need to refactor this code to use [updater functions](https://react.dev/learn/queueing-a-series-of-state-updates#updating-the-same-state-multiple-times-before-the-next-render) or equivalent.

### Yarn 3 for New Projects[​](#yarn-3-for-new-projects "Direct link to Yarn 3 for New Projects")

[Yarn 3](https://yarnpkg.com/blog/release/3.0) is now the default JavaScript package manager for new projects initialized with React Native Community CLI.

Yarn 3.x will be used with `nodeLinker: node-modules`, a mode providing compatibility with React Native libraries. This replaces Yarn Classic (1.x, deprecated) as the previous default. To upgrade Yarn version inside your existing app you can follow this [guide](https://yarnpkg.com/migration/guide).

```
$ yarn --help━━━ Yarn Package Manager - 3.6.4 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  $ yarn <command>
```

The Community CLI also supports initializing projects with other package managers via the `--pm` flag ([read more](https://github.com/react-native-community/cli/blob/main/docs/init.md)).

## Breaking Changes[​](#breaking-changes-1 "Direct link to Breaking Changes")

### Android Minimum SDK Bump (Android 6.0)[​](#android-minimum-sdk-bump-android-60 "Direct link to Android Minimum SDK Bump (Android 6.0)")

React Native 0.74 has a minimum Android SDK version requirement of 23 (Android 6.0). Previously, this was Android 5.0 (API 21). See our context for this change [here](https://github.com/react-native-community/discussions-and-proposals/discussions/740).

#### Bonus: Android app size reduction[​](#bonus-android-app-size-reduction "Direct link to Bonus: Android app size reduction")

The minimum SDK bump, together with several improvements at our native build, allowed us to greatly reduce the app size on user devices.

For example a newly created app with React Native 0.74 occupies ~13% less space on user device, resulting in ~4MB saved on device.

![Side-by-side comparison of a new React Native app in the Android system storage view](https://reactnative.dev/assets/images/0.74-android-app-size-0dc90c5494d274e5c4691287866bf518.jpg)

### Removal of Deprecated `PropTypes`[​](#removal-of-deprecated-proptypes "Direct link to removal-of-deprecated-proptypes")

Before 0.74, React Native continued to ship with `PropTypes`, an API that has been deprecated since React 15.5 in 2017! We are now removing all built-in `PropTypes` from React Native, reducing app size (26.4kB in a minified bundle) and memory overhead.

The following `PropTypes` properties are removed: `Image.propTypes`, `Text.propTypes`, `TextInput.propTypes`, `ColorPropType`, `EdgeInsetsPropType`, `PointPropType`, `ViewPropTypes` (see [commit](https://github.com/facebook/react-native/commit/228cb80af9ded20107f3c7a30ffe00e24471bfeb)).

If your app or library relies on `PropTypes`, we highly recommend migrating to a type system like TypeScript.

### API Changes to PushNotificationIOS (Deprecated)[​](#api-changes-to-pushnotificationios-deprecated "Direct link to API Changes to PushNotificationIOS (Deprecated)")

In React Native 0.74, we are making steps to remove the deprecated [PushNotificationIOS](https://reactnative.dev/docs/pushnotificationios) library. The changes in this release are focused on removing references to older iOS APIs. PushNotificationIOS has been migrated onto Apple’s [User Notifications](https://developer.apple.com/documentation/usernotifications?language=objc) framework and exposes new APIs for scheduling and handling notifications.

In the next release (0.75), we are planning to **remove this library**, relocating it out of React Native core and into the community package, [@react-native-community/push-notification-ios](https://github.com/react-native-push-notification/ios). If you are still relying on PushNotificationIOS, you’ll need to migrate over before the next release.

#### API Changes[​](#api-changes "Direct link to API Changes")

The `didRegisterUserNotificationSettings:` callback on `RCTPushNotificationManager` was a no-op and has been deleted.

The following callbacks on `RCTPushNotificationManager` have been deprecated and will be removed in 0.75:

```
+ (void)didReceiveLocalNotification:(UILocalNotification *)notification;+ (void)didReceiveRemoteNotification:(NSDictionary *)notification;
```

In order to retrieve the notification which launched the app using `getInitialNotification()`, you’ll now need to explicitly set the `initialNotification` on `RCTPushNotificationManager`:

```
[RCTPushNotificationManager setInitialNotification:response.notification];
```

On the JS side, properties on `Notification` have changed. `alertAction` and `repeatInterval` are now deprecated and will be removed in 0.75:

```
type Notification = {  ...  // NEW: Seconds from now to display the notification.  fireIntervalSeconds?: ?number,  // CHANGED: Used only for scheduling notifications. Will be null when  // retrieving notifications using `getScheduledLocalNotifications` or  // `getDeliveredNotifications`.  soundName?: ?string,  // DEPRECATED: This was used for iOS's legacy UILocalNotification.  alertAction?: ?string,  // DEPRECATED: Use `fireDate` or `fireIntervalSeconds` instead.  repeatInterval?: ?string,};
```

Finally, the `handler` parameter on `PushNotificationIOS.removeEventListener` is unused and has been removed.

**💡 How to Migrate**

#### iOS[​](#ios "Direct link to iOS")

Your `AppDelegate` will need to implement `UNUserNotificationCenterDelegate`. This should be done on app startup in `application:willFinishLaunchingWithOptions:` or `application:didFinishLaunchingWithOptions:` (see [Apple Docs](https://developer.apple.com/documentation/usernotifications/unusernotificationcenterdelegate?language=objc) for more details).

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions{  ...  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];  center.delegate = self;  return YES;}
```

Implement `[userNotificationCenter:willPresentNotification:withCompletionHandler:](https://developer.apple.com/documentation/usernotifications/unusernotificationcenterdelegate/1649518-usernotificationcenter?language=objc)`, which is called when a notification arrives and the app is in the _foreground_. Use the `completionHandler` to determine if the notification will be shown to the user and notify `RCTPushNotificationManager` accordingly:

```
- (void)userNotificationCenter:(UNUserNotificationCenter *)center       willPresentNotification:(UNNotification *)notification         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler{  // This will trigger 'notification' and 'localNotification' events on PushNotificationIOS  [RCTPushNotificationManager didReceiveNotification:notification];  // Decide if and how the notification will be shown to the user  completionHandler(UNNotificationPresentationOptionNone);}
```

To handle when a notification is tapped, implement `[userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:](https://developer.apple.com/documentation/usernotifications/unusernotificationcenterdelegate/1649501-usernotificationcenter?language=objc)`. Note that if you set foreground notifications to be shown in `userNotificationCenter:willPresentNotification:withCompletionHandler:`, you should only notify `RCTPushNotificationManager` in one of these callbacks.

If the tapped notification resulted in app launch, call `setInitialNotification:`. If the notification was not previously handled by `userNotificationCenter:willPresentNotification:withCompletionHandler:`, call `didReceiveNotification:` as well:

```
- (void)  userNotificationCenter:(UNUserNotificationCenter *)center  didReceiveNotificationResponse:(UNNotificationResponse *)response           withCompletionHandler:(void (^)(void))completionHandler{  // This condition passes if the notification was tapped to launch the app  if ([response.actionIdentifier isEqualToString:UNNotificationDefaultActionIdentifier]) {  // Allow the notification to be retrieved on the JS side using getInitialNotification()    [RCTPushNotificationManager setInitialNotification:response.notification];  } // This will trigger 'notification' and 'localNotification' events on PushNotificationIOS  [RCTPushNotificationManager didReceiveNotification:response.notification];  completionHandler();}
```

Finally, delete the following methods and adapt the logic into the callbacks above which will be called instead:

1.  `[application:didReceiveLocalNotification:](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622930-application?language=objc)` \[deprecated\]
2.  `[application:didReceiveRemoteNotification:](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623117-application?language=objc)` \[deprecated\]
3.  `[application:didReceiveRemoteNotification:fetchCompletionHandler:](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application?language=objc)` \[not deprecated, but is superseded by the `UNUserNotificationCenterDelegate` methods\]

Delete any usages of `[application:didRegisterUserNotificationSettings:](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623022-application?language=objc)` and `RCTPushNotificationManager`’s corresponding `didRegisterUserNotificationSettings:` as well.

**Example:** See the RNTester `[AppDelegate.mm](https://github.com/facebook/react-native/blob/main/packages/rn-tester/RNTester/AppDelegate.mm)`.

#### JS[​](#js "Direct link to JS")

1.  Remove any references to `alertAction`.
2.  Remove the `handler` argument on any calls to `removeEventListener`.
3.  Replace any usages of `repeatInterval` by firing multiple notifications using `fireDate` or `fireIntervalSeconds` instead.
4.  Note that `soundName` will be null when it is accessed on a `Notification` returned from `getScheduledLocalNotifications()` and `getDeliveredNotifications()`.

### Removal of Flipper React Native Plugin[​](#removal-of-flipper-react-native-plugin "Direct link to Removal of Flipper React Native Plugin")

Use of [Flipper](https://fbflipper.com/) for inspecting React Native layouts, network requests, and [other React Native plugin features](https://fbflipper.com/docs/features/react-native/), is now unsupported. In 0.74, we have removed the native Flipper libraries and setup code from new React Native projects. This means fewer dependencies and quicker local setup (see [original RFC](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0641-decoupling-flipper-from-react-native-core.md)).

The diff for removing Flipper in your app can be seen in the [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/). If you want to preserve Flipper in an existing app, ignore the relevant diff lines.

**💡 To re-integrate Flipper**

Flipper can still be used as a standalone tool for debugging an Android or iOS app, and can be manually integrated by following the Flipper docs ([Android guide](https://fbflipper.com/docs/getting-started/android-native/), [iOS guide](https://fbflipper.com/docs/getting-started/ios-native/)).

We recommend that teams invest in switching to native debugging tooling in Android Studio and Xcode.

#### JavaScript debugging[​](#javascript-debugging "Direct link to JavaScript debugging")

Using the [Hermes Debugger](https://reactnative.dev/docs/debugging?js-debugger=hermes#opening-the-debugger) remains our recommended debugging option for 0.74. You can also try the [Experimental New Debugger](https://reactnative.dev/docs/debugging?js-debugger=new-debugger#opening-the-debugger), which is also the default in Expo. This continues to be an early preview — known issues and updates can be followed [here](https://github.com/react-native-community/discussions-and-proposals/discussions/733).

### Other Breaking Changes[​](#other-breaking-changes "Direct link to Other Breaking Changes")

**General**

-   Make `start`/`end` in styles always refer to writing direction ([#42251](https://github.com/facebook/react-native/pull/42251)).

**Android**

-   Remove of `JSIModule*` from `FabricUIManagerProvider` ([#42059](https://github.com/facebook/react-native/pull/42059)).
    -   This API was unused in open source — use [TurboModules](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/turbo-modules.md) instead.
-   Deprecate `UIManagerModule.showPopupMenu` and `UIManagerModule.dismissPopupMenu` ([#42441](https://github.com/facebook/react-native/pull/42441))
    -   This API has been moved to the [`@react-native/popup-menu-android`](https://www.npmjs.com/package/@react-native/popup-menu-android) npm package and will be removed in 0.75.

**iOS**

-   Delete `configFilename` and `configKey` arguments from iOS codegen CLI ([#41533](https://github.com/facebook/react-native/pull/41533)).
-   Change how [`bundleURL`](https://github.com/facebook/react-native/blob/0.74-stable/packages/react-native/template/ios/HelloWorld/AppDelegate.mm#L22-L29) is handled ([#43994](https://github.com/facebook/react-native/pull/43994)).
    -   Before, `bundleURL` was set when React Native was started in an instance variable and it was not possible to update it.
    -   Now, [`bundleUrl` is a function](https://github.com/facebook/react-native/blob/0.74-stable/packages/react-native/template/ios/HelloWorld/AppDelegate.mm#L22-L29) which is re-evaluated when needed, enabling the use of a different URL across refreshes.
    -   This change will affect your app only if you were changing the `bundleURL` variable after the app is started. In this case, move the logic that updates the variable to the [`bundleURL` function](https://github.com/facebook/react-native/blob/0.74-stable/packages/react-native/template/ios/HelloWorld/AppDelegate.mm#L22-L29) in `AppDelegate`.

Please see the [full changelog](https://github.com/facebook/react-native/blob/main/CHANGELOG.md) for a complete list of breaking changes.

## Known Issues[​](#known-issues "Direct link to Known Issues")

**iOS**

-   Edge case when using multiple windows: When the main window is inactive and the system tries to present a dialog, the dialog is not presented in the right position on the screen. A fix is incoming in [#44167](https://github.com/facebook/react-native/pull/44167) and will ship in 0.74.1.

## Acknowledgements[​](#acknowledgements "Direct link to Acknowledgements")

React Native 0.74 contains over [1673 commits](https://github.com/facebook/react-native/compare/v0.73.6...v0.74.0) from 57 contributors. Thanks for all your hard work!

Thanks to all the additional authors that worked on documenting features in this release post:

-   [Nick Gerleman](https://github.com/NickGerleman) for _Yoga 3.0_
-   [Joe Vilches](https://github.com/joevilches) for _Yoga 3.0_
-   [Riccardo Cipolleschi](https://twitter.com/CipolleschiR) for _New Architecture: Bridgeless by Default_
-   [Samuel Susla](https://twitter.com/SamuelSusla) for _New Architecture: Batched `onLayout` updates_
-   [Tim Yung](https://twitter.com/yungsters) for _Removal of Deprecated `PropTypes`_
-   [Ingrid Wang](https://github.com/ingridwang) for _API Changes to PushNotificationIOS (Deprecated)_

## Upgrade to 0.74[​](#upgrade-to-074 "Direct link to Upgrade to 0.74")

Please use the [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) to view code changes between React Native versions for existing projects, in addition to the [Upgrading docs](https://reactnative.dev/docs/upgrading).

To create a new project:

```
npx react-native@latest init MyProject
```

If you use Expo, React Native 0.74 will be supported in Expo SDK 51.

info

0.74 is now the latest stable version of React Native and **0.71.x moves to unsupported**. For more information see [React Native's support policy](https://github.com/reactwg/react-native-releases#releases-support-policy). We aim to publish a final end-of-life update of 0.71 at the beginning of May.