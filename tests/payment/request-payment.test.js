const { NuveiEnvironment, Transaction } = require("../../dist");

// Initialize with Nuvei test credentials
// Replace with your actual Nuvei credentials
NuveiEnvironment.init(
    "YOUR_MERCHANT_ID",
    "YOUR_MERCHANT_SITE_ID",
    "YOUR_MERCHANT_SECRET_KEY",
    true // Use sandbox
);

// Example: Create an order using the new openOrder method
async function testOpenOrder() {
    const transaction = new Transaction();

    try {
        const orderData = {
            clientUniqueId: `order_${Date.now()}`,
            currency: "GBP",
            amount: "769.00",
            email: "test@example.com",
            country: "GB",
            billingAddress: {
                firstName: "Amit",
                lastName: "Kumar",
                address: "111 Conduit House",
                city: "London",
                country: "GB",
                zip: "W4 4HH",
                email: "test@example.com"
            }
        };

        const response = await transaction.openOrder(orderData);
        console.log("Order created:", response);

        if (response.sessionToken) {
            console.log("Session Token:", response.sessionToken);
            // Use this token with the Web SDK on the client side
        }
    } catch (error) {
        console.error("Error creating order:", error);
    }
}

testOpenOrder();