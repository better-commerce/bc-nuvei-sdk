const { NuveiEnvironment, Transaction } = require("../dist");

const merchantId = "7791190954169088226"
const merchantSiteId = "1195117"
const merchantSecretKey = "5ziJ8r5W3cv7pZOf10AJ3v5AEJRZc2T11cz1L3sfyjEeJKNQNdaoGAX8JyxQ2EWT"

// Initialize Nuvei SDK with test credentials
NuveiEnvironment.init(merchantId, merchantSiteId, merchantSecretKey, true);  // Use sandbox

// Test unregisterGooglePayDomains API
async function testUnregisterGooglePayDomains() {
    const transaction = new Transaction();

    try {
        // Define domains to unregister
        const domainsToUnregister = [
            "www.example.com",
            "mobile.example.com"
        ];

        console.log("Unregistering Google Pay domains...");
        console.log("Domains to unregister:", domainsToUnregister);

        const result = await transaction.unregisterGooglePayDomains({
            domainNames: domainsToUnregister
        });

        console.log("\nUnregister Google Pay Domains Response:", JSON.stringify(result, null, 2));

        // Check overall status
        if (result.status === 'SUCCESS') {
            console.log("\n✅ Request processed successfully");
            console.log("Merchant Name:", result.merchantName);

            // Check individual domain statuses if available
            if (result.domains && Array.isArray(result.domains)) {
                console.log("\nDomain Status Details:");
                result.domains.forEach(domain => {
                    if (domain.status === 'SUCCESS') {
                        console.log(`  ✅ ${domain.domainName} - Successfully unregistered`);
                    } else {
                        console.log(`  ❌ ${domain.domainName} - Failed: ${domain.reason || 'Unknown error'}`);
                        if (domain.errCode) {
                            console.log(`     Error Code: ${domain.errCode}`);
                        }
                    }
                });
            }
        } else {
            console.log("\n❌ Request failed");
            console.log("Error Code:", result.errCode);
            console.log("Reason:", result.reason);
        }

        return result;
    } catch (error) {
        console.error("Error in unregisterGooglePayDomains:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
        throw error;
    }
}

// Optional: Test error handling with empty domains
async function testUnregisterWithEmptyDomains() {
    const transaction = new Transaction();

    try {
        console.log("\n\nTesting error handling with empty domains array...");
        await transaction.unregisterGooglePayDomains({
            domainNames: []
        });
    } catch (error) {
        console.log("✅ Correctly caught error for empty domains:", error.message);
    }
}

// Run the tests
async function runTests() {
    try {
        // Test normal unregistration
        await testUnregisterGooglePayDomains();

        // Test error handling
        await testUnregisterWithEmptyDomains();

        console.log("\n✅ All tests completed successfully");
    } catch (error) {
        console.error("\n❌ Tests failed:", error.message);
        process.exit(1);
    }
}

runTests();