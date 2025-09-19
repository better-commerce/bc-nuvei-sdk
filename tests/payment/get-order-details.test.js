const { NuveiEnvironment, Transaction } = require("../../dist");

// Initialize with Nuvei test credentials
// Replace with your actual Nuvei credentials
NuveiEnvironment.init(
    "YOUR_MERCHANT_ID",
    "YOUR_MERCHANT_SITE_ID",
    "YOUR_MERCHANT_SECRET_KEY",
    true // Use sandbox
);

const sessionToken = "test-session-token-here"
new Transaction().getDetails(sessionToken)
    .then(response => {
        console.log(response)
    });