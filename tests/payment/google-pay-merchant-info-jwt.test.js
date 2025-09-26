const { NuveiEnvironment, Transaction } = require("../../dist");

const merchantId = "7791190954169088226"
const merchantSiteId = "1195117"
const merchantSecretKey = "5ziJ8r5W3cv7pZOf10AJ3v5AEJRZc2T11cz1L3sfyjEeJKNQNdaoGAX8JyxQ2EWT"

// Initialize Nuvei SDK with test credentials
NuveiEnvironment.init(merchantId, merchantSiteId, merchantSecretKey, true);  // Use sandbox

// Test getGooglePayMerchantInfoJwt API
async function testGetGooglePayMerchantInfoJwt(merchantOrigin) {
    const transaction = new Transaction();

    try {
        // First, create a session by opening an order
        console.log("Creating session token...");
        const orderResult = await transaction.openOrder({
            clientUniqueId: `test_jwt_${Date.now()}`,
            currency: "USD",
            amount: "100.00",
            country: "US",
            email: "test@example.com",
            billingAddress: {
                firstName: "John",
                lastName: "Doe",
                country: "US",
                email: "test@example.com"
            },
            urlDetails: {
                successUrl: "https://example.com/success",
                failureUrl: "https://example.com/failure",
                pendingUrl: "https://example.com/pending",
                notificationUrl: "https://example.com/webhook"
            }
        });

        if (!orderResult.sessionToken) {
            throw new Error("Failed to get session token from openOrder");
        }

        console.log("Session Token created:", orderResult.sessionToken);

        // Now get the Google Pay merchant info JWT
        console.log("\nGetting Google Pay merchant info JWT...");
        const jwtResult = await transaction.getGooglePayMerchantInfoJwt({ merchantOrigin, sessionToken: orderResult.sessionToken });

        console.log("Google Pay Merchant Info JWT Response:", JSON.stringify(jwtResult, null, 2));

        if (jwtResult.merchantInfo) {
            console.log("\n✅ Merchant Info received successfully:");
            console.log("  - Merchant Name:", jwtResult.merchantInfo.merchantName);
            console.log("  - Merchant ID:", jwtResult.merchantInfo.merchantId);
            console.log("  - Merchant Origin:", jwtResult.merchantInfo.merchantOrigin);
            console.log("  - Auth JWT:", jwtResult.merchantInfo.authJwt ?
                `${jwtResult.merchantInfo.authJwt.substring(0, 50)}...` : 'Not provided');
        }

        return jwtResult;
    } catch (error) {
        console.error("Error in getGooglePayMerchantInfoJwt:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
        throw error;
    }
}

const merchantOrigin = "parkcameras.bettercommerce.tech"

// Run the test
testGetGooglePayMerchantInfoJwt(merchantOrigin)
    .then(result => {
        console.log("\n✅ Test completed successfully");
        console.log("Status:", result.status);
    })
    .catch(error => {
        console.error("\n❌ Test failed:", error.message);
        process.exit(1);
    });