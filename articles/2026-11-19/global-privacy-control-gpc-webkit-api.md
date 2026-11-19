---
title: "Global Privacy Control (GPC) WebKit API"
source: "https://webkit.org/blog/18646/global-privacy-control-gpc-webkit-api/"
publishedDate: "2026-11-18"
category: "web-standards"
feedName: "WebKit Blog"
---

As of iOS, iPadOS, visionOS, and macOS 27, there is now a WebKit API to enable [Global Privacy Control (GPC)](https://www.w3.org/TR/gpc/), an emerging web standard. As a developer using WebKit APIs like WKWebView, or WebPage for SwiftUI, you can add your own user setting to control it.

The [specification](https://www.w3.org/TR/gpc/) as of November 10, 2026, says:

> “Global Privacy Control is designed to allow users to express a preference to opt out of sharing and cross-context targeted advertising”

According to the California Office of the Attorney General’s [webpage](https://www.oag.ca.gov/privacy/ccpa) for the California Consumer Privacy Act (CCPA) as of November 10, 2026:

> “This landmark law secures new privacy rights for California consumers, including: (…) The right to opt-out of the sale or sharing of their personal information including via the [GPC](https://www.oag.ca.gov/privacy/ccpa/gpc)”

## API

There is a new `WKWebpagePreferences` property, `globalPrivacyControlEnabled`. Setting it to `YES` on the preferences object handed back from the navigation-policy delegate opts that navigation into GPC. This applies to the whole document tree produced by the navigation. Once enabled, both `navigator.globalPrivacyControl` and the `Sec-GPC: 1` request header are active for the main frame, its subframes, and their subresources.

The Swift `WebPage` API exposes the same capability through a `WebPage.NavigationPreferences` property, `isGlobalPrivacyControlEnabled`.

### Apple Developer Documentation Links

-   [WKWebpagePreferences / globalPrivacyControlEnabled](https://developer.apple.com/documentation/webkit/wkwebpagepreferences/globalprivacycontrolenabled)
-   [WebPage.NavigationPreferences / isGlobalPrivacyControlEnabled](https://developer.apple.com/documentation/webkit/webpage/navigationpreferences/isglobalprivacycontrolenabled)

## Example Usage

### Swift (WKWebView)

```
func webView(
        _ webView: WKWebView,
        decidePolicyFor navigationAction: WKNavigationAction,
        preferences: WKWebpagePreferences
    ) async -> (WKNavigationActionPolicy, WKWebpagePreferences) {
        preferences.globalPrivacyControlEnabled = userPrefersGlobalPrivacyControl
        return (.allow, preferences)
}
```

### Swift (WebPage)

```
func decidePolicy(
        for action: WebPage.NavigationAction,
        preferences: inout WebPage.NavigationPreferences
    ) async -> WKNavigationActionPolicy {
        preferences.isGlobalPrivacyControlEnabled = userPrefersGlobalPrivacyControl
        return .allow
}
```

### Objective-C

```
- (void)webView:(WKWebView *)webView
        decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction
        preferences:(WKWebpagePreferences *)preferences
        decisionHandler:(void (^)(WKNavigationActionPolicy, WKWebpagePreferences *))decisionHandler
{
    preferences.globalPrivacyControlEnabled = self.userPrefersGlobalPrivacyControl;
    decisionHandler(WKNavigationActionPolicyAllow, preferences);
}
```