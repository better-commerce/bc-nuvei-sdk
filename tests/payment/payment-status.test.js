const { NuveiEnvironment, Transaction } = require("../../dist");

// Initialize Nuvei SDK with test credentials
// Replace these with your actual test credentials
NuveiEnvironment.init(
    "YOUR_MERCHANT_ID",
    "YOUR_MERCHANT_SITE_ID",
    "YOUR_MERCHANT_SECRET_KEY",
    true // Use sandbox
);

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
const sessionToken = process.argv[2] || "YOUR_SESSION_TOKEN_HERE";

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