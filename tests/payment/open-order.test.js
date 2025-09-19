const { NuveiEnvironment, Transaction } = require("../../dist");

const merchantId = "7791190954169088226"
const merchantSiteId = "1195117"
const merchantSecretKey = "5ziJ8r5W3cv7pZOf10AJ3v5AEJRZc2T11cz1L3sfyjEeJKNQNdaoGAX8JyxQ2EWT"

// Initialize Nuvei SDK with test credentials
NuveiEnvironment.init(merchantId, merchantSiteId, merchantSecretKey, true);  // Use sandbox

// Test openOrder API
async function testOpenOrder() {
    const transaction = new Transaction();

    try {
        const result = await transaction.openOrder({
            clientUniqueId: `test_${Date.now()}`,
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

        console.log("Open Order Response:", result);

        if (result.sessionToken) {
            console.log("Session Token:", result.sessionToken);
            console.log("Order ID:", result.orderId);
        }

        return result.sessionToken;
    } catch (error) {
        console.error("Error in openOrder:", error);
        throw error;
    }
}

// Run the test
testOpenOrder()
    .then(sessionToken => {
        console.log("Test completed successfully. Session Token:", sessionToken);
    })
    .catch(error => {
        console.error("Test failed:", error);
    });