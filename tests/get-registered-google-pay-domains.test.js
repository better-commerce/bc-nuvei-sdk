const { NuveiEnvironment, Transaction } = require("../dist");

const merchantId = "7791190954169088226"
const merchantSiteId = "1195117"
const merchantSecretKey = "5ziJ8r5W3cv7pZOf10AJ3v5AEJRZc2T11cz1L3sfyjEeJKNQNdaoGAX8JyxQ2EWT"

// Initialize Nuvei SDK with test credentials
NuveiEnvironment.init(merchantId, merchantSiteId, merchantSecretKey, true);  // Use sandbox

// Test getRegisteredGooglePayDomains API
async function testGetRegisteredGooglePayDomains(domainNames = []) {
    const transaction = new Transaction();

    try {
        // Test 1: Get all registered domains (no filter)
        console.log("\n=== Test 1: Getting all registered domains ===");
        const allDomainsResult = await transaction.getRegisteredGooglePayDomains({ domainNames });

        console.log("All Domains Response:", allDomainsResult);

        if (allDomainsResult.status === "SUCCESS") {
            console.log("Status:", allDomainsResult.status);
            console.log("Merchant ID:", allDomainsResult.merchantId);
            console.log("Merchant Site ID:", allDomainsResult.merchantSiteId);
            console.log("Version:", allDomainsResult.version);
            console.log("Registered domains:", allDomainsResult.domainNames || []);
            console.log("Number of domains:", allDomainsResult.domainNames ? allDomainsResult.domainNames.length : 0);
        } else {
            console.log("Error:", allDomainsResult.reason || "Unknown error");
            console.log("Error code:", allDomainsResult.errCode);
        }

        // Test 2: Query specific domains (filter by domain names)
        console.log("\n=== Test 2: Query specific domains ===");
        const specificDomains = ["parkcameras.bettercommerce.tech", "localhost:3000"];

        const specificDomainsResult = await transaction.getRegisteredGooglePayDomains({
            domainNames: specificDomains
        });

        console.log("Specific Domains Query Response:", specificDomainsResult);

        if (specificDomainsResult.status === "SUCCESS") {
            console.log("Status:", specificDomainsResult.status);
            console.log("Queried domains:", specificDomains);
            console.log("Returned domains:", specificDomainsResult.domainNames || []);

            // Check if queried domains are in the registered list
            if (specificDomainsResult.domainNames) {
                const registeredSet = new Set(specificDomainsResult.domainNames);
                specificDomains.forEach(domain => {
                    const isRegistered = registeredSet.has(domain);
                    console.log(`  ${domain}: ${isRegistered ? "✓ Registered" : "✗ Not Registered"}`);
                });
            }
        } else {
            console.log("Error:", specificDomainsResult.reason || "Unknown error");
            console.log("Error code:", specificDomainsResult.errCode);
        }

        // Test 3: Empty query (should return all domains, same as Test 1)
        console.log("\n=== Test 3: Empty domains array (should return all domains) ===");
        const emptyQueryResult = await transaction.getRegisteredGooglePayDomains({
            domainNames: []
        });

        console.log("Empty Query Response:", emptyQueryResult);

        if (emptyQueryResult.status === "SUCCESS") {
            console.log("Status:", emptyQueryResult.status);
            console.log("Domains returned:", emptyQueryResult.domainNames || []);
            console.log("Number of domains:", emptyQueryResult.domainNames ? emptyQueryResult.domainNames.length : 0);
        } else {
            console.log("Error:", emptyQueryResult.reason || "Unknown error");
            console.log("Error code:", emptyQueryResult.errCode);
        }

        // Test 4: Query non-existent domain
        console.log("\n=== Test 4: Query non-existent domain ===");
        const nonExistentDomain = ["nonexistent.example.com"];

        const nonExistentResult = await transaction.getRegisteredGooglePayDomains({
            domainNames: nonExistentDomain
        });

        console.log("Non-existent Domain Query Response:", nonExistentResult);

        if (nonExistentResult.status === "SUCCESS") {
            console.log("Status:", nonExistentResult.status);
            console.log("Queried domain:", nonExistentDomain[0]);
            console.log("Returned domains:", nonExistentResult.domainNames || []);

            if (nonExistentResult.domainNames) {
                const isFound = nonExistentResult.domainNames.includes(nonExistentDomain[0]);
                console.log(`Domain found: ${isFound ? "Yes" : "No (as expected)"}`);
            }
        } else {
            console.log("Error:", nonExistentResult.reason || "Unknown error");
            console.log("Error code:", nonExistentResult.errCode);
        }

        // Test 5: Verify response structure
        console.log("\n=== Test 5: Verify response structure ===");
        console.log("Response has internalRequestId:", 'internalRequestId' in allDomainsResult);
        console.log("Response has status:", 'status' in allDomainsResult);
        console.log("Response has merchantId:", 'merchantId' in allDomainsResult);
        console.log("Response has merchantSiteId:", 'merchantSiteId' in allDomainsResult);
        console.log("Response has version:", 'version' in allDomainsResult);
        console.log("Response has clientRequestId:", 'clientRequestId' in allDomainsResult);
        console.log("Response has domainNames:", 'domainNames' in allDomainsResult);

        return allDomainsResult;

    } catch (error) {
        console.error("\n=== Error during test execution ===");
        console.error("Error type:", error.constructor.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);

        // Check if it's an API error
        if (error.httpResponseCode) {
            console.error("HTTP Response Code:", error.httpResponseCode);
            console.error("Error Code:", error.errorCode);
            console.error("Error Message:", error.errorMessage);
            console.error("Status:", error.status);
        }

        throw error;
    }
}

// Additional test for error scenarios
async function testErrorScenarios() {
    console.log("\n\n=== TESTING ERROR SCENARIOS ===");

    // Test with invalid credentials (if needed)
    // This would require temporarily changing the environment

    console.log("\n=== Test: Invalid domain format (if API validates) ===");
    const transaction = new Transaction();

    try {
        const invalidDomainResult = await transaction.getRegisteredGooglePayDomains({
            domainNames: ["", "   ", "invalid domain with spaces"]
        });

        console.log("Invalid domain test result:", invalidDomainResult);
    } catch (error) {
        console.log("Expected error for invalid domains:", error.message);
    }
}

// Run all tests
async function runAllTests() {
    console.log("====================================================");
    console.log("   TESTING getRegisteredGooglePayDomains API");
    console.log("====================================================");
    console.log("Environment: SANDBOX");
    console.log("Merchant ID:", merchantId);
    console.log("Merchant Site ID:", merchantSiteId);
    console.log("====================================================");

    try {
        // Main tests
        const result = await testGetRegisteredGooglePayDomains();

        // Error scenario tests
        await testErrorScenarios();

        console.log("\n====================================================");
        console.log("   ALL TESTS COMPLETED SUCCESSFULLY");
        console.log("====================================================");
        console.log("Final status:", result.status);

    } catch (error) {
        console.error("\n====================================================");
        console.error("   TEST SUITE FAILED");
        console.error("====================================================");
        console.error("Error:", error.message || error);
        process.exit(1);
    }
}

// Execute the test suite
runAllTests();