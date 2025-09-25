const { NuveiEnvironment, Transaction } = require("../dist");

const merchantId = "7791190954169088226"
const merchantSiteId = "1195117"
const merchantSecretKey = "5ziJ8r5W3cv7pZOf10AJ3v5AEJRZc2T11cz1L3sfyjEeJKNQNdaoGAX8JyxQ2EWT"

// Initialize Nuvei SDK with test credentials
NuveiEnvironment.init(merchantId, merchantSiteId, merchantSecretKey, true);  // Use sandbox

// Test registerGooglePayDomains API
async function testRegisterGooglePayDomains(domainsToRegister) {
    const transaction = new Transaction();

    try {
        // Test 1: Get current registered domains (if any)
        console.log("\n=== Test 1: Getting current registered domains ===");
        const getCurrentDomains = await transaction.registerGooglePayDomains({
            agreedToGooglePayTermsAndConditions: true
        });

        console.log("Current Domains Response:", getCurrentDomains);
        if (getCurrentDomains.status === "SUCCESS") {
            console.log("Status:", getCurrentDomains.status);
            console.log("Current domains:", getCurrentDomains.domains || "No domains registered");
        }

        // Test 2: Register new domains
        console.log("\n=== Test 2: Registering new domains ===");

        const registerResult = await transaction.registerGooglePayDomains({
            domainNames: domainsToRegister,
            agreedToGooglePayTermsAndConditions: true
        });

        console.log("Register Domains Response:", registerResult);
        if (registerResult.status === "SUCCESS") {
            console.log("Status:", registerResult.status);
            console.log("Registered domains:", registerResult.domains);
        } else {
            console.log("Registration failed:", registerResult.reason || "Unknown error");
        }

        // Test 3: Verify domains were registered
        console.log("\n=== Test 3: Verifying registered domains ===");
        const verifyDomains = await transaction.registerGooglePayDomains({
            agreedToGooglePayTermsAndConditions: true
        });

        console.log("Verify Domains Response:", verifyDomains);
        if (verifyDomains.status === "SUCCESS") {
            console.log("Status:", verifyDomains.status);
            console.log("Verified domains:", verifyDomains.domains);
        }

        return registerResult;
    } catch (error) {
        console.error("Error in registerGooglePayDomains test:", error);
        throw error;
    }
}

const domainsToRegister = [
    "parkcameras.bettercommerce.tech",
    "localhost:3000",
    "localhost:3001",
];

// Run the test
testRegisterGooglePayDomains(domainsToRegister)
    .then(result => {
        console.log("\n=== Test completed successfully ===");
        console.log("Final result:", result.status);
    })
    .catch(error => {
        console.error("\n=== Test failed ===");
        console.error("Error:", error.message || error);
    });