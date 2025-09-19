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