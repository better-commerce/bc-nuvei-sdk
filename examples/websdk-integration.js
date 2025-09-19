/**
 * Example: Server-side integration for Nuvei Web SDK with React
 * This example shows how to use the SDK to support a React SPA with Nuvei Web SDK
 */

const { NuveiEnvironment, Transaction } = require("bc-nuvei-sdk");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Nuvei SDK with your credentials
NuveiEnvironment.init(
    process.env.NUVEI_MERCHANT_ID,
    process.env.NUVEI_MERCHANT_SITE_ID,
    process.env.NUVEI_MERCHANT_SECRET_KEY,
    process.env.NODE_ENV !== "production" // Use sandbox in non-production
);

const transaction = new Transaction();

/**
 * Endpoint to create a payment session
 * Called by React app before initializing Nuvei Web SDK
 */
app.post("/api/payment/init", async (req, res) => {
    try {
        const {
            amount,
            currency,
            email,
            country,
            billingAddress,
            shippingAddress,
            items
        } = req.body;

        // Generate unique ID for this order
        const clientUniqueId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Open order and get session token
        const result = await transaction.openOrder({
            clientUniqueId,
            currency: currency || "USD",
            amount,
            country,
            email,
            billingAddress,
            shippingAddress,
            urlDetails: {
                successUrl: `${process.env.FRONTEND_URL}/payment/success`,
                failureUrl: `${process.env.FRONTEND_URL}/payment/failure`,
                pendingUrl: `${process.env.FRONTEND_URL}/payment/pending`,
                notificationUrl: `${process.env.BACKEND_URL}/api/payment/webhook`
            },
            transactionType: "Sale"
        });

        // Return session token to React app
        res.json({
            success: true,
            sessionToken: result.sessionToken,
            orderId: result.orderId,
            merchantId: NuveiEnvironment.getMerchantId(),
            merchantSiteId: NuveiEnvironment.getMerchantSiteId(),
            clientUniqueId
        });

    } catch (error) {
        console.error("Error initializing payment:", error);
        res.status(500).json({
            success: false,
            error: "Failed to initialize payment session"
        });
    }
});

/**
 * Endpoint to check payment status
 * Called by React app after payment completion
 */
app.post("/api/payment/status", async (req, res) => {
    try {
        const { sessionToken } = req.body;

        const result = await transaction.getPaymentStatus(sessionToken);

        res.json({
            success: true,
            status: result.transactionStatus,
            transactionId: result.transactionId,
            amount: result.amount,
            currency: result.currency,
            authCode: result.authCode
        });

    } catch (error) {
        console.error("Error checking payment status:", error);
        res.status(500).json({
            success: false,
            error: "Failed to check payment status"
        });
    }
});

/**
 * Endpoint to update order details
 * Called if order details need to be modified after session creation
 */
app.post("/api/payment/update", async (req, res) => {
    try {
        const {
            sessionToken,
            clientUniqueId,
            amount,
            currency,
            items,
            billingAddress,
            shippingAddress
        } = req.body;

        const result = await transaction.updateOrder({
            sessionToken,
            clientUniqueId,
            amount,
            currency,
            items,
            billingAddress,
            shippingAddress
        });

        res.json({
            success: true,
            sessionToken: result.sessionToken,
            orderId: result.orderId
        });

    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({
            success: false,
            error: "Failed to update order"
        });
    }
});

/**
 * Endpoint to process refund
 * Called from admin panel or after order cancellation
 */
app.post("/api/payment/refund", async (req, res) => {
    try {
        const {
            transactionId,
            amount,
            currency,
            reason
        } = req.body;

        const clientUniqueId = `refund_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const result = await transaction.refundTransaction({
            clientUniqueId,
            amount,
            currency,
            relatedTransactionId: transactionId,
            comment: reason
        });

        res.json({
            success: true,
            refundTransactionId: result.transactionId,
            status: result.transactionStatus
        });

    } catch (error) {
        console.error("Error processing refund:", error);
        res.status(500).json({
            success: false,
            error: "Failed to process refund"
        });
    }
});

/**
 * Webhook endpoint for Nuvei notifications
 * Configure this URL in Nuvei merchant portal
 */
app.post("/api/payment/webhook", async (req, res) => {
    try {
        console.log("Received webhook:", req.body);

        // Process webhook data here
        // Update order status in your database
        // Send confirmation emails, etc.

        res.json({ received: true });

    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ error: "Webhook processing failed" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});