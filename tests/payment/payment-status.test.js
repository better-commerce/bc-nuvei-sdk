const { NuveiEnvironment, Transaction } = require("../../dist");

const merchantId = "7791190954169088226"
const merchantSiteId = "1195117"
const merchantSecretKey = "5ziJ8r5W3cv7pZOf10AJ3v5AEJRZc2T11cz1L3sfyjEeJKNQNdaoGAX8JyxQ2EWT"

// Initialize Nuvei SDK with test credentials
NuveiEnvironment.init(merchantId, merchantSiteId, merchantSecretKey, true);  // Use sandbox

// Test getPaymentStatus API
async function testPaymentStatus(sessionToken) {
    const transaction = new Transaction();

    try {
        const result = await transaction.getPaymentStatus(sessionToken);

        console.log("Payment Status Response:", result);

        if (result.transactionStatus) {
            console.log("Transaction Status:", result.transactionStatus);
            console.log("Transaction ID:", result.transactionId);
            console.log("Amount:", result.amount, result.currency);
        }

        return result;
    } catch (error) {
        console.error("Error in getPaymentStatus:", error);
        throw error;
    }
}

// Example usage - replace with actual session token
const sessionToken = "20a364e8170a47a7a19151b2c58a55040121";

if (sessionToken === "YOUR_SESSION_TOKEN_HERE") {
    console.error("Please provide a session token as command line argument:");
    console.error("node payment-status.test.js <sessionToken>");
    process.exit(1);
}

// Run the test
testPaymentStatus(sessionToken)
    .then(result => {
        console.log("Test completed successfully");
    })
    .catch(error => {
        console.error("Test failed:", error);
    });