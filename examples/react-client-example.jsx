/**
 * Example: React client-side integration with Nuvei Web SDK
 * This example shows how a React SPA would use the server-side SDK endpoints
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Server API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Nuvei Web SDK script URL
const NUVEI_SDK_URL = process.env.NODE_ENV === 'production'
    ? 'https://cdn.safecharge.com/safecharge_resources/v1/websdk/safecharge.js'
    : 'https://cdn-test.safecharge.com/safecharge_resources/v1/websdk/safecharge.js';

function PaymentForm() {
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [safeCharge, setSafeCharge] = useState(null);
    const [cardFields, setCardFields] = useState(null);

    // Load Nuvei Web SDK script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = NUVEI_SDK_URL;
        script.async = true;
        script.onload = () => {
            console.log('Nuvei Web SDK loaded');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Initialize payment session
    const initializePayment = async (orderData) => {
        setLoading(true);
        setError(null);

        try {
            // Call server to create payment session
            const response = await axios.post(`${API_BASE_URL}/api/payment/init`, {
                amount: orderData.amount,
                currency: orderData.currency || 'USD',
                email: orderData.email,
                country: orderData.country || 'US',
                billingAddress: {
                    firstName: orderData.firstName,
                    lastName: orderData.lastName,
                    email: orderData.email,
                    country: orderData.country || 'US',
                    city: orderData.city,
                    address: orderData.address,
                    zip: orderData.zip
                }
            });

            if (response.data.success) {
                setSessionData(response.data);

                // Initialize Nuvei Web SDK with session data
                const sfc = window.SafeCharge({
                    merchantId: response.data.merchantId,
                    merchantSiteId: response.data.merchantSiteId,
                    sessionToken: response.data.sessionToken,
                    env: process.env.NODE_ENV === 'production' ? 'prod' : 'test'
                });

                setSafeCharge(sfc);

                // Initialize Nuvei Fields for secure card input
                const fields = sfc.fields({
                    fonts: [{ cssUrl: '' }],
                    locale: 'en',
                    fontSize: '16px'
                });

                // Create card input fields
                const cardNumber = fields.create('ccNumber', {
                    style: {
                        base: {
                            fontSize: '16px',
                            fontFamily: 'Arial, sans-serif',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }
                    }
                });

                const cvv = fields.create('cvv', {
                    style: {
                        base: {
                            fontSize: '16px',
                            fontFamily: 'Arial, sans-serif',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }
                    }
                });

                const expiry = fields.create('ccExpiration', {
                    style: {
                        base: {
                            fontSize: '16px',
                            fontFamily: 'Arial, sans-serif',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }
                    }
                });

                // Mount fields to DOM elements
                cardNumber.mount('#card-number');
                cvv.mount('#cvv');
                expiry.mount('#expiry');

                setCardFields({ cardNumber, cvv, expiry });
            }

        } catch (err) {
            console.error('Error initializing payment:', err);
            setError('Failed to initialize payment session');
        } finally {
            setLoading(false);
        }
    };

    // Process payment using Nuvei Web SDK
    const processPayment = async () => {
        if (!safeCharge || !cardFields || !sessionData) {
            setError('Payment not initialized');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Get cardholder name from form
            const cardHolderName = document.getElementById('cardholder-name').value;

            // Call Nuvei createPayment (client-side)
            safeCharge.createPayment({
                sessionToken: sessionData.sessionToken,
                merchantId: sessionData.merchantId,
                merchantSiteId: sessionData.merchantSiteId,
                cardHolderName: cardHolderName,
                paymentOption: cardFields.cardNumber,
                billingAddress: {
                    email: document.getElementById('email').value,
                    country: 'US'
                }
            }, function(result) {
                console.log('Payment result:', result);

                if (result.result === 'APPROVED') {
                    // Payment successful
                    checkPaymentStatus(sessionData.sessionToken);
                } else if (result.result === 'DECLINED') {
                    setError('Payment was declined');
                    setLoading(false);
                } else {
                    setError('Payment failed: ' + (result.errorDescription || 'Unknown error'));
                    setLoading(false);
                }
            });

        } catch (err) {
            console.error('Error processing payment:', err);
            setError('Failed to process payment');
            setLoading(false);
        }
    };

    // Check payment status on server
    const checkPaymentStatus = async (sessionToken) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/payment/status`, {
                sessionToken: sessionToken
            });

            if (response.data.success) {
                console.log('Payment confirmed:', response.data);
                // Redirect to success page or show success message
                window.location.href = '/payment/success';
            } else {
                setError('Payment verification failed');
            }

        } catch (err) {
            console.error('Error checking payment status:', err);
            setError('Failed to verify payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-form">
            <h2>Secure Payment</h2>

            {error && (
                <div className="error-message">{error}</div>
            )}

            <form onSubmit={(e) => {
                e.preventDefault();
                if (sessionData) {
                    processPayment();
                } else {
                    const formData = {
                        amount: e.target.amount.value,
                        currency: 'USD',
                        email: e.target.email.value,
                        firstName: e.target.firstName.value,
                        lastName: e.target.lastName.value,
                        address: e.target.address.value,
                        city: e.target.city.value,
                        zip: e.target.zip.value,
                        country: 'US'
                    };
                    initializePayment(formData);
                }
            }}>
                {!sessionData ? (
                    // Order details form
                    <>
                        <h3>Order Details</h3>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            step="0.01"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            required
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            required
                        />
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP Code"
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Initializing...' : 'Continue to Payment'}
                        </button>
                    </>
                ) : (
                    // Payment form with Nuvei Fields
                    <>
                        <h3>Payment Information</h3>
                        <div className="form-group">
                            <label>Cardholder Name</label>
                            <input
                                type="text"
                                id="cardholder-name"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Card Number</label>
                            <div id="card-number"></div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <div id="expiry"></div>
                            </div>
                            <div className="form-group">
                                <label>CVV</label>
                                <div id="cvv"></div>
                            </div>
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Processing...' : `Pay $${sessionData.amount || '0.00'}`}
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}

export default PaymentForm;