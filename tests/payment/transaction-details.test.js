const { NuveiEnvironment, Transaction } = require("../../dist");

const merchantId = "7791190954169088226"
const merchantSiteId = "1195117"
const merchantSecretKey = "5ziJ8r5W3cv7pZOf10AJ3v5AEJRZc2T11cz1L3sfyjEeJKNQNdaoGAX8JyxQ2EWT"

// Initialize Nuvei SDK with test credentials
NuveiEnvironment.init(merchantId, merchantSiteId, merchantSecretKey, true);  // Use sandbox

// Test getPaymentStatus API
async function testTransactionDetails(transactionId, clientUniqueId) {
    const transaction = new Transaction();

    try {
        const result = await transaction.getTransactionDetails({ transactionId, clientUniqueId });

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

// Run the test
testTransactionDetails("", "10819-4335458")
    .then(result => {
        console.log("Test completed successfully");
    })
    .catch(error => {
        console.error("Test failed:", error);
    });