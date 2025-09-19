const { NuveiEnvironment, Transaction } = require("../../dist");

const merchantId = "7791190954169088226"
const merchantSiteId = "1195117"
const merchantSecretKey = "5ziJ8r5W3cv7pZOf10AJ3v5AEJRZc2T11cz1L3sfyjEeJKNQNdaoGAX8JyxQ2EWT"

// Initialize Nuvei SDK with test credentials
NuveiEnvironment.init(merchantId, merchantSiteId, merchantSecretKey, true);  // Use sandbox

// Test getSessionToken API
async function testGetSessionToken() {
    const transaction = new Transaction();

    try {
        console.log("Testing getSessionToken API...");

        const result = await transaction.getSessionToken();

        console.log("GetSessionToken Response:", result);

        if (result.status === "SUCCESS" && result.sessionToken) {
            console.log("✅ Session Token successfully generated:");
            console.log("   Session Token:", result.sessionToken);
            console.log("   Client Request ID:", result.clientRequestId);
            console.log("   Internal Request ID:", result.internalRequestId);
            return result.sessionToken;
        } else {
            console.error("❌ Failed to get session token:");
            console.error("   Status:", result.status);
            console.error("   Error Code:", result.errCode);
            console.error("   Reason:", result.reason);
            throw new Error(`Failed to get session token: ${result.reason}`);
        }

    } catch (error) {
        console.error("❌ Error in getSessionToken:", error);
        throw error;
    }
}

// Run the test
testGetSessionToken()
    .then(sessionToken => {
        console.log("\n✅ Test completed successfully!");
        console.log("Session Token can be used for subsequent API calls.");
        console.log("\nExample usage:");
        console.log("- Use this token in /payment requests for server-to-server transactions");
        console.log("- Token is valid for a limited time (usually 15-20 minutes)");
    })
    .catch(error => {
        console.error("\n❌ Test failed:", error);
        process.exit(1);
    });