/**
 * Example: Server-to-Server REST API Integration with Nuvei
 * This example shows how to use getSessionToken for server-side payment processing
 * without requiring client-side Web SDK
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
 * Server-to-Server payment flow example
 * This endpoint handles the complete payment process server-side
 */
app.post("/api/payment/process-server", async (req, res) => {
    try {
        const {
            amount,
            currency,
            cardNumber,
            cardHolderName,
            expirationMonth,
            expirationYear,
            CVV,
            email,
            billingAddress
        } = req.body;

        // Step 1: Get session token for authentication
        console.log("Step 1: Getting session token...");
        const sessionResponse = await transaction.getSessionToken();

        if (sessionResponse.status !== "SUCCESS" || !sessionResponse.sessionToken) {
            throw new Error(`Failed to get session token: ${sessionResponse.reason}`);
        }

        const sessionToken = sessionResponse.sessionToken;
        console.log("Session token obtained:", sessionToken);

        // Step 2: Process payment using the session token
        // Note: This would require implementing a separate /payment endpoint
        // which is part of the server-to-server REST API

        // For now, we'll return the session token and indicate next steps
        res.json({
            success: true,
            message: "Session token generated successfully",
            sessionToken: sessionToken,
            nextStep: "Use this token to call /payment endpoint with card details",
            note: "In production, you would process the payment server-side using this token"
        });

    } catch (error) {
        console.error("Error processing server-to-server payment:", error);
        res.status(500).json({
            success: false,
            error: "Failed to process payment",
            details: error.message
        });
    }
});

/**
 * Endpoint to just get a session token
 * Can be used for various server-to-server operations
 */
app.get("/api/auth/session-token", async (req, res) => {
    try {
        console.log("Generating new session token...");

        const result = await transaction.getSessionToken();

        if (result.status === "SUCCESS" && result.sessionToken) {
            res.json({
                success: true,
                sessionToken: result.sessionToken,
                expiresIn: "15 minutes", // Typical expiration time
                merchantId: result.merchantId,
                merchantSiteId: result.merchantSiteId
            });
        } else {
            throw new Error(result.reason || "Failed to generate session token");
        }

    } catch (error) {
        console.error("Error getting session token:", error);
        res.status(500).json({
            success: false,
            error: "Failed to generate session token",
            details: error.message
        });
    }
});

/**
 * Example of how session token would be used in subsequent requests
 * This demonstrates the authentication pattern
 */
app.post("/api/payment/status-with-token", async (req, res) => {
    try {
        const { sessionToken } = req.body;

        if (!sessionToken) {
            // If no token provided, generate a new one
            const tokenResponse = await transaction.getSessionToken();
            if (tokenResponse.status !== "SUCCESS") {
                throw new Error("Failed to generate session token");
            }
            sessionToken = tokenResponse.sessionToken;
        }

        // Use the session token for authenticated operations
        // For example, checking payment status
        const status = await transaction.getPaymentStatus(sessionToken);

        res.json({
            success: true,
            paymentStatus: status,
            note: "Session token was used for authentication"
        });

    } catch (error) {
        console.error("Error checking payment status:", error);
        res.status(500).json({
            success: false,
            error: "Failed to check payment status",
            details: error.message
        });
    }
});

/**
 * Health check endpoint that also validates SDK configuration
 */
app.get("/api/health", async (req, res) => {
    try {
        // Try to generate a session token to verify configuration
        const result = await transaction.getSessionToken();

        res.json({
            status: "healthy",
            sdkConfigured: true,
            environment: NuveiEnvironment.getEnvironment(),
            merchantId: NuveiEnvironment.getMerchantId(),
            canAuthenticate: result.status === "SUCCESS"
        });

    } catch (error) {
        res.status(500).json({
            status: "unhealthy",
            sdkConfigured: false,
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server-to-Server API running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`Nuvei Environment: ${NuveiEnvironment.getEnvironment()}`);

    console.log("\nAvailable endpoints:");
    console.log("- GET  /api/health                  - Health check");
    console.log("- GET  /api/auth/session-token      - Get session token");
    console.log("- POST /api/payment/process-server  - Process payment server-side");
    console.log("- POST /api/payment/status-with-token - Check payment status");
});