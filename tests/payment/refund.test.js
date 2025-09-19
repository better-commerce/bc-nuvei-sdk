const { NuveiEnvironment, Transaction } = require("../../dist");

// Initialize Nuvei SDK with test credentials
// Replace these with your actual test credentials
NuveiEnvironment.init(
    "YOUR_MERCHANT_ID",
    "YOUR_MERCHANT_SITE_ID",
    "YOUR_MERCHANT_SECRET_KEY",
    true // Use sandbox
);

// Test refundTransaction API
async function testRefund(transactionId) {
    const transaction = new Transaction();

    try {
        const result = await transaction.refundTransaction({
            clientUniqueId: `refund_${Date.now()}`,
            amount: "50.00", // Partial refund
            currency: "USD",
            relatedTransactionId: transactionId,
            comment: "Customer requested refund"
        });

        console.log("Refund Response:", result);

        if (result.transactionId) {
            console.log("Refund Transaction ID:", result.transactionId);
            console.log("Refund Status:", result.transactionStatus);
        }

        return result;
    } catch (error) {
        console.error("Error in refundTransaction:", error);
        throw error;
    }
}

// Example usage - replace with actual transaction ID
const transactionId = process.argv[2] || "YOUR_TRANSACTION_ID_HERE";

if (transactionId === "YOUR_TRANSACTION_ID_HERE") {
    console.error("Please provide a transaction ID as command line argument:");
    console.error("node refund.test.js <transactionId>");
    process.exit(1);
}

// Run the test
testRefund(transactionId)
    .then(result => {
        console.log("Test completed successfully");
    })
    .catch(error => {
        console.error("Test failed:", error);
    });