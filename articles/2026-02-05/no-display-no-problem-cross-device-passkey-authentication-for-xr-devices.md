---
title: "No Display? No Problem: Cross-Device Passkey Authentication for XR Devices"
source: "https://engineering.fb.com/2026/02/04/security/cross-device-passkey-authentication-for-xr-devices-meta-quest/"
publishedDate: "2026-02-04"
category: "engineering"
feedName: "Meta Engineering"
---

-   We’re sharing a novel approach to enabling cross-device passkey authentication for devices with inaccessible displays (like XR devices).
-   Our approach bypasses the use of QR codes and enables cross-device authentication without the need for an on-device display, while still complying with all trust and proximity requirements.
-   This approach builds on work done by the FIDO Alliance and we hope it will open the door to bring secure, passwordless authentication to a whole new ecosystem of devices and platforms.

Passkeys are a significant leap forward in authentication, offering a phishing-resistant, cryptographically secure alternative to traditional passwords. Generally, the standard cross-device passkey flow, where someone registers or authenticates on a desktop device by approving the action on their nearby mobile device, is done in a familiar way with QR codes scanned by their phone camera.  But how can we facilitate this flow for XR devices with a head-mounted display or no screen at all, or for other devices with an _inaccessible display_ like smart home hubs and industrial sensors? 

We’ve taken a  novel approach to adapting the WebAuthn passkey flow and [FIDO’s CTAP hybrid protocol](https://fidoalliance.org/specs/fido-v2.0-id-20180227/fido-client-to-authenticator-protocol-v2.0-id-20180227.html) for this unique class of devices that either lack a screen entirely or whose screen is not easily accessible to another device’s camera. Our implementation has been developed and is now broadly available on Meta Quest devices powered by Meta Horizon OS. We hope that this approach can also ensure robust security built on the strength of existing passkey frameworks, without sacrificing usability, for users of a variety of other screenless IoT devices, consumer electronics, and industrial hardware.

![](https://engineering.fb.com/wp-content/uploads/2026/02/Meta-Quest-cross-device-passkey.gif)

## The Challenge: No Screen, No QR Code

The [standard cross-device flow](http://fidoalliance.org/specs/fido-v2.2-ps-20250714/fido-client-to-authenticator-protocol-v2.2-ps-20250714.html#sctn-hybrid) relies on two primary mechanisms:

1.  **QR code scanning:** The relying party displays a QR code on the desktop/inaccessible device, which the mobile authenticator scans to establish a secure link.
2.  **Bluetooth/NFC proximity:** The devices use local communication protocols to discover each other and initiate the secure exchange.

For devices with no display, the QR code method is impossible. Proximity-based discovery is feasible, but initiating the user verification step and confirming the intent without any on-device visual feedback can introduce security and usability risks. People need clear assurance that they are approving the correct transaction on the correct device.

## Our Solution: Using a Companion App for Secure Message Transport

Scanning a QR code sends the authenticator device a command to initiate a hybrid (cross-device) login flow with a nonce that identifies the unauthenticated device client. But if a user has a companion application – like the Meta Horizon app – that uses the same account as the device we can use that application to pass this same request to the authenticator OS and execute it using general link/intent execution.

We made the flow easy to navigate by using in-app notifications to show users when a login request has been initiated, take them directly into the application, and immediately execute the login request.

For simplicity, we opted to begin the hybrid flow as soon as the application is opened since the user would have had to take some action (clicking the notification or opening the app) to trigger this and there is an additional user verification step in hybrid implementations on iOS and Android.

Here’s how this plays out on a Meta Quest with the Meta Horizon mobile app:

![](https://engineering.fb.com/wp-content/uploads/2026/02/Meta-XR-passkeys-flow.png)

### 1\. The Hybrid Flow Message Is Generated

When a passkey login is initiated on the Meta Quest, the headset’s browser locally constructs the same payload that would have been embedded in a QR Code – including a fresh ECDH public key, a session-specific secret, and routing information used later in the handshake. Instead of rendering this information into an image (QR code), the browser encodes it into a FIDO URL (the standard mechanism defined for hybrid transport) that instructs the mobile device to begin the passkey authentication flow.

### 2\. The Message Is Sent to the Companion App

After the FIDO URL is generated, the headset requires a secure and deterministic method for transferring it to the user’s phone. Because the device cannot present a QR code, the system leverages the Meta Horizon app’s authenticated push channel to deliver the FIDO URL directly to the mobile device. When the user selects the passkey option in the login dialog, the headset encodes the FIDO URL as structured data within a GraphQL-based push notification. 

The Meta Horizon app, signed in with the same account as the headset, receives this payload and validates the delivery context to ensure it is routed to the correct user. 

### 3\. The Application Sends a Notification of the Login Request

After the FIDO URL is delivered to the mobile device, the platform’s push service surfaces it as a standard iOS or Android notification indicating that a login request is pending. When the user taps the notification, the operating system routes the deep link to the Meta Horizon app. The app then opens the FIDO URL using the system URL launcher and invokes the operating system passkey interface.

For users that have the notification turned off or disabled, launching the Meta Horizon app directly will also trigger a query to the backend for any pending passkey requests associated with the user’s account. If a valid request exists (requests expire after five minutes), the app automatically initiates the same passkey flow by opening the FIDO URL.

Once the FIDO URL is opened, the mobile device begins the hybrid transport sequence, including broadcasting the BLE advertisement, establishing the encrypted tunnel, and producing the passkey assertion. In this flow, the system notification and the app launch path both serve as user consent surfaces and entry points into the standard hybrid transport workflow.

### 4\. The App Executes the Hybrid Command

Once the user approves the action on their mobile device, the secure channel is established as per WebAuthn standards. The main difference is the challenge exchange timing:

1.  The inaccessible device generates the standard WebAuthn challenge and waits.
2.  The mobile authenticator, initiates the secure BLE/NFC connection.
3.  The challenge is transmitted over this secure channel.
4.  Upon UV success, the mobile device uses the relevant key material to generate the AuthenticatorAssertionResponse or AuthenticatorAttestationResponse.
5.  The response is sent back to the inaccessible device.

The inaccessible device then acts as the conduit, forwarding the response to the relying party server to complete the transaction, exactly as a standard display-equipped device would.

## Impact and Future Direction

This novel implementation successfully bypasses the need for an on-device display in the cross-device flow and still complies with the proximity and other trust challenges that exist today for cross-device passkey login. We hope that our solution paves the way for secure, passwordless authentication across a wider range of different platforms and ecosystems, moving passkeys beyond just mobile and desktop environments and into the burgeoning world of wearable and IoT devices. 

We are proud to build on top of and collaborate the excellent work already done in this area by our peers in the FIDO Alliance and mobile operating systems committed to this work and building a robust and interoperable ecosystem for secure and easy login.