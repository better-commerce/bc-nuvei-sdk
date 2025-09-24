# BetterCommerce Nuvei NodeJS SDK

BetterCommerce's Nuvei NodeJS SDK enables server-side integration with [Nuvei payment ](https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#RESTAPIOverview) for Web SDK implementations. This SDK provides server-to-server API calls to support React/JavaScript applications using Nuvei Web SDK.

Use below command for package installation:

```bash
npm install @better-commerce/bc-nuvei-sdk
```

## Architecture Diagram

![Architecture Diagram](/assets/app-architecture.png)

## Features

- **Web SDK Support**: Server-side APIs for Nuvei Web SDK integration
- **Session Management**: Create and manage payment sessions
- **Secure Payments**: PCI-compliant payment processing
- **Transaction Management**: Refunds, voids, and status checks
- **TypeScript Support**: Full TypeScript definitions included

## SDK Initialization

Initialize the SDK with your Nuvei merchant credentials:

```javascript
const { NuveiEnvironment, Transaction } = require('@better-commerce/bc-nuvei-sdk');

// Initialize with your credentials
NuveiEnvironment.init(
    "YOUR_MERCHANT_ID",
    "YOUR_MERCHANT_SITE_ID",
    "YOUR_MERCHANT_SECRET_KEY",
    true // Use sandbox (false for production)
);
```

## Core APIs for Web SDK Integration

### 1. Open Order (Create Payment Session)

Creates a payment session and returns a sessionToken for client-side Web SDK:

```javascript
const transaction = new Transaction();

const result = await transaction.openOrder({
    clientUniqueId: "order_12345",
    currency: "USD",
    amount: "99.99",
    country: "US",
    email: "customer@example.com",
    billingAddress: {
        firstName: "John",
        lastName: "Doe",
        country: "US",
        email: "customer@example.com",
        city: "New York",
        address: "123 Main St",
        zip: "10001"
    },
    urlDetails: {
        successUrl: "https://yoursite.com/success",
        failureUrl: "https://yoursite.com/failure",
        pendingUrl: "https://yoursite.com/pending",
        notificationUrl: "https://yourapi.com/webhook"
    }
});

// Returns: { sessionToken, orderId, merchantId, merchantSiteId, ... }
```

### 2. Update Order

Modify an existing order's details:

```javascript
await transaction.updateOrder({
    sessionToken: "session_token_here",
    clientUniqueId: "order_12345",
    amount: "149.99", // Updated amount
    currency: "USD",
    billingAddress: {
        // Updated billing details
    }
});
```

### 3. Get Payment Status

Check the status of a payment transaction:

```javascript
const status = await transaction.getPaymentStatus("session_token_here");

// Returns: { transactionStatus, transactionId, amount, currency, ... }
```

### 4. Refund Transaction

Process full or partial refunds:

```javascript
const refund = await transaction.refundTransaction({
    clientUniqueId: "refund_12345",
    amount: "50.00", // Partial refund
    currency: "USD",
    relatedTransactionId: "original_transaction_id",
    comment: "Customer requested refund"
});
```

### 5. Void Transaction

Cancel a pending transaction:

```javascript
const void = await transaction.voidTransaction({
    clientUniqueId: "void_12345",
    amount: "99.99",
    currency: "USD",
    relatedTransactionId: "transaction_to_void",
    comment: "Order cancelled"
});
```

## Integration with React Web SDK

This SDK works in conjunction with Nuvei Web SDK on the client side. Here's the typical flow:

1. **Server**: Call `openOrder()` to create a session
2. **Server**: Return sessionToken to client
3. **Client**: Initialize Nuvei Web SDK with sessionToken
4. **Client**: Collect card details using Nuvei Fields
5. **Client**: Call `createPayment()` from Web SDK
6. **Server**: Verify payment with `getPaymentStatus()`

See the `/examples` directory for complete integration examples.

## Environment Configuration

The SDK supports both sandbox and production environments:

```javascript
// Sandbox (for testing)
NuveiEnvironment.init(merchantId, merchantSiteId, secretKey, true);

// Production
NuveiEnvironment.init(merchantId, merchantSiteId, secretKey, false);
```

## Error Handling

All methods throw errors that should be caught and handled:

```javascript
try {
    const result = await transaction.openOrder({...});
} catch (error) {
    console.error('Payment initialization failed:', error);
    // Handle error appropriately
}
```

## Google Pay + Nuvei Setup Guide (Sandbox & Production)

### The Two-Part System Explained

#### Part 1: Google Pay (TEST Mode)
- **Purpose**: Shows the Google Pay button and collects card details
- **No Account Needed**: TEST mode works without any Google account
- **Automatic Test Cards**: Shows fake cards automatically when clicked

#### Part 2: Nuvei (Sandbox)
- **Purpose**: Processes the actual payment
- **Account Needed**: Yes, you need Nuvei sandbox credentials
- **Get From**: Nuvei support team

---

### Part A: Sandbox Setup (5 Minutes)

#### Step 1: Get Nuvei Sandbox Credentials
Contact Nuvei support and get:
- Merchant ID (example: `2000078803`)
- Site ID (example: `240615`)
- Secret Key (for backend)

#### Step 2: Configure for Sandbox
```javascript
// Sandbox configuration:
{
  merchantId: "2000078803",        // Your Nuvei Merchant ID
  merchantSiteId: "240615",               // Your Nuvei Site ID
  gatewayMerchantId: "googletest",     // ⚠️ ALWAYS "googletest" for sandbox
  UseSandbox: "true"                 // Enables test mode
}
```

#### Step 3: Test in Sandbox
1. Go to checkout page
2. Click Google Pay button (appears automatically in TEST mode)
3. Select any test card shown
4. Complete payment
5. Check Nuvei sandbox dashboard

---

### Part B: Production Setup

#### Step 1: Prerequisites for Production
1. **Nuvei Production Account**
   - Production Merchant ID
   - Production Site ID
   - Production Secret Key

2. **Google Pay Business Registration**
   - Register at [Google Pay & Wallet Console](https://pay.google.com/business/console)
   - Add your business information
   - Verify your business identity

#### Step 2: Domain Verification (Required for Production)
1. **Add your domain to Google Pay Console**
   - Go to Google Pay & Wallet Console
   - Navigate to "Web integration" → "Domains"
   - Add your production domain (e.g., `www.yourstore.com`)
   - Download verification file
   - Upload to your domain root
   - Verify domain ownership

2. **Send Screenshots to Nuvei**
   - Take screenshots of your checkout flow with Google Pay
   - Include your domain URL in screenshots
   - Send to Nuvei Integration Team for approval

#### Step 3: Get Production Gateway Merchant ID
Contact Nuvei support for:
- Production gateway merchant ID (different from "googletest")
- Usually format: `your_merchant_name_nuvei` or similar
- Must be approved by Nuvei before use

#### Step 4: Configure for Production
```javascript
// Production configuration:
{
  merchantId: "YOUR_PROD_MERCHANT_ID",     // Production Merchant ID
  merchantSiteId: "YOUR_PROD_SITE_ID",           // Production Site ID
  gatewayMerchantId: "YOUR_GATEWAY_ID",       // Production gateway ID from Nuvei
  UseSandbox: "false",                      // ⚠️ Must be false for production
  GooglePayMerchantId: "BCR2DN4XXXXXXXXX"   // Your Google Pay Merchant ID
}
```

#### Step 5: Production Checklist
- [ ] Google Pay business account verified
- [ ] Domain verified in Google Pay Console
- [ ] Screenshots sent to Nuvei
- [ ] Production gateway merchant ID received from Nuvei
- [ ] Production credentials configured
- [ ] UseSandbox set to "false"
- [ ] Test transaction completed successfully

---

### How It Works 🎉

#### Sandbox Mode:
```
1. UseSandbox: "true" → Google Pay TEST mode
2. gatewayMerchantId: "googletest" → Nuvei sandbox gateway
3. Test cards appear automatically
4. Payments go to Nuvei sandbox
```

#### Production Mode:
```
1. UseSandbox: "false" → Google Pay PRODUCTION mode
2. gatewayMerchantId: Your gateway ID → Nuvei production gateway
3. Real cards from user's Google Pay wallet
4. Payments processed live
```

---

### Common Questions

#### Sandbox Testing:
**Q: Do I need a Google Pay account for testing?**
A: No! TEST mode works without any Google account.

**Q: What's "googletest"?**
A: A special gateway ID that tells Nuvei you're testing Google Pay.

#### Production:
**Q: What accounts do I need for production?**
A: Both Google Pay Business Console account AND Nuvei production account.

**Q: How long does production setup take?**
A: Domain verification: 1-2 days. Nuvei approval: 2-3 business days.

**Q: Can I test 3DS?**
A: Yes! In sandbox, transactions over £100 trigger 3DS.

---

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Google Pay button doesn't appear | Check console for errors, ensure UseSandbox is "true" |
| "Invalid merchant" error | Make sure gatewayMerchantId is "googletest" |
| Payment fails | Check Nuvei credentials are correct |
| No test cards showing | Browser might be blocking popups, try Chrome |

---

### Quick Reference

#### Sandbox vs Production Settings

| Setting | Sandbox | Production |
|---------|---------|------------|
| UseSandbox | "true" | "false" |
| gatewayMerchantId | "googletest" | Your gateway ID from Nuvei |
| Google Pay Mode | TEST (automatic) | PRODUCTION (automatic) |
| GooglePayMerchantId | Not needed | Your Google merchant ID |
| Domain Verification | Not needed | Required |
| Real Money | No | Yes |

#### Migration Path: Sandbox → Production
1. ✅ Complete sandbox testing
2. ✅ Register with Google Pay Business
3. ✅ Verify domain
4. ✅ Get production gateway ID from Nuvei
5. ✅ Update configuration
6. ✅ Switch UseSandbox to "false"
7. ✅ Deploy and test with real card

## Security Notes

- **Never expose your merchant secret key** on the client side
- Always validate webhook signatures
- Use HTTPS for all API communications
- Store credentials securely using environment variables

## Examples

Check the `/examples` directory for:
- `websdk-integration.js` - Express server example
- `react-client-example.jsx` - React component for Web SDK

## Support

For issues and questions, please contact BetterCommerce support or refer to [Nuvei Documentation](https://docs.nuvei.com).