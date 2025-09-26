// Other Imports
import { Api } from "../api";
import { RequestMethod } from "../constants/enums";
import { ITransaction } from "../base/contracts/ITransaction";
import { IOpenOrderRequest, IOpenOrderResponse, IUpdateOrderRequest, IUpdateOrderResponse, IGetPaymentStatusRequest, IGetPaymentStatusResponse, IRefundTransactionRequest, IRefundTransactionResponse, IVoidTransactionRequest, IVoidTransactionResponse, IAddress, IUserDetails, IUrlDetails, IGetSessionTokenRequest, IGetSessionTokenResponse, IGetTransactionDetailsRequest, IGetTransactionDetailsResponse, IRegisterGooglePayDomainsRequest, IRegisterGooglePayDomainsResponse, IGetGooglePayMerchantInfoJwtRequest, IGetGooglePayMerchantInfoJwtResponse } from "../models";
import NuveiEnvironment from "../base/config/NuveiEnvironment";
import { ChecksumUtil } from "../utils/checksum";
import { Endpoints } from "../constants/Endpoints";


export default class Transaction implements ITransaction {

    /**
     * Gets a session token for server-to-server API authentication.
     * This token is required for subsequent API calls in the server-to-server flow.
     * 
     * API Reference - https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#getSessionToken
     *
     * @returns {Promise<IGetSessionTokenResponse>} A promise resolving to the session token response
     */
    async getSessionToken(): Promise<IGetSessionTokenResponse> {
        try {
            const merchantId = NuveiEnvironment.getMerchantId();
            const merchantSiteId = NuveiEnvironment.getMerchantSiteId();
            const clientRequestId = ChecksumUtil.generateClientRequestId();
            const timeStamp = ChecksumUtil.getCurrentTimestamp();

            const checksum = ChecksumUtil.generateSessionTokenChecksum(merchantId, merchantSiteId, clientRequestId, timeStamp );

            const request: IGetSessionTokenRequest = { merchantId, merchantSiteId, clientRequestId, timeStamp, checksum };

            const response = await Api.call(Endpoints.Payment.GET_SESSION_TOKEN, RequestMethod.POST, request, {}, { 'Content-Type': 'application/json' });

            return response;
        } catch (error) {
            console.error('Error in getSessionToken:', error);
            throw error;
        }
    }

    /**
     * Initiates an order session for payment processing.
     * This is the first step in the payment flow.
     * 
     * API Reference - https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#openOrder
     *
     * @param {Object} params The order parameters
     * @returns {Promise<IOpenOrderResponse>} A promise resolving to the open order response with sessionToken
     */
    async openOrder(params: { clientUniqueId: string; currency: string; amount: string; userDetails?: IUserDetails; billingAddress?: IAddress; shippingAddress?: IAddress; urlDetails?: IUrlDetails; country?: string; email?: string; transactionType?: string; isRebilling?: string; }): Promise<IOpenOrderResponse> {
        try {
            const merchantId = NuveiEnvironment.getMerchantId();
            const merchantSiteId = NuveiEnvironment.getMerchantSiteId();
            const clientRequestId = ChecksumUtil.generateClientRequestId();
            const timeStamp = ChecksumUtil.getCurrentTimestamp();

            const checksum = ChecksumUtil.generateOpenOrderChecksum( merchantId, merchantSiteId, clientRequestId, params.amount, params.currency, timeStamp );

            const request: IOpenOrderRequest = { merchantId, merchantSiteId, clientRequestId, clientUniqueId: params.clientUniqueId, currency: params.currency, amount: params.amount, timeStamp, checksum, ...params };

            const response = await Api.call(Endpoints.Payment.OPEN_ORDER, RequestMethod.POST, request, {}, { 'Content-Type': 'application/json' });

            return response;
        } catch (error) {
            console.error('Error in openOrder:', error);
            throw error;
        }
    }

    /**
     * Updates an existing order with new details.
     * 
     * API Reference - https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#updateOrder
     *
     * @param {Object} params The update order parameters
     * @returns {Promise<IUpdateOrderResponse>} A promise resolving to the update order response
     */
    async updateOrder(params: { sessionToken: string; clientUniqueId: string; currency?: string; amount?: string; items?: any[]; userDetails?: IUserDetails; billingAddress?: IAddress; shippingAddress?: IAddress; }): Promise<IUpdateOrderResponse> {
        try {
            const merchantId = NuveiEnvironment.getMerchantId();
            const merchantSiteId = NuveiEnvironment.getMerchantSiteId();
            const clientRequestId = ChecksumUtil.generateClientRequestId();
            const timeStamp = ChecksumUtil.getCurrentTimestamp();

            const checksum = ChecksumUtil.generateChecksum([ merchantId, merchantSiteId, clientRequestId, params.clientUniqueId, params.amount || '', params.currency || '', timeStamp ]);

            const request: IUpdateOrderRequest = { merchantId, merchantSiteId, sessionToken: params.sessionToken, clientRequestId, clientUniqueId: params.clientUniqueId, timeStamp, checksum, ...params };

            const response = await Api.call( Endpoints.Payment.UPDATE_ORDER, RequestMethod.POST, request, {}, { 'Content-Type': 'application/json' } );

            return response;
        } catch (error) {
            console.error('Error in updateOrder:', error);
            throw error;
        }
    }

    /**
     * Refunds a transaction.
     * 
     * API Reference - https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#refundTransaction
     *
     * @param {Object} params The refund parameters
     * @returns {Promise<IRefundTransactionResponse>} A promise resolving to the refund response
     */
    async refundTransaction(params: { clientUniqueId: string; amount: string; currency: string; relatedTransactionId: string; comment?: string; }): Promise<IRefundTransactionResponse> {
        try {
            const merchantId = NuveiEnvironment.getMerchantId();
            const merchantSiteId = NuveiEnvironment.getMerchantSiteId();
            const clientRequestId = ChecksumUtil.generateClientRequestId();
            const timeStamp = ChecksumUtil.getCurrentTimestamp();

            const checksum = ChecksumUtil.generateRefundChecksum( merchantId, merchantSiteId, clientRequestId, params.clientUniqueId, params.amount, params.currency, params.relatedTransactionId, timeStamp );

            const request: IRefundTransactionRequest = { merchantId, merchantSiteId, clientRequestId, clientUniqueId: params.clientUniqueId, amount: params.amount, currency: params.currency, relatedTransactionId: params.relatedTransactionId, timeStamp, checksum, comment: params.comment };

            const response = await Api.call( Endpoints.Payment.REFUND_TRANSACTION, RequestMethod.POST, request, {}, { 'Content-Type': 'application/json' } );

            return response;
        } catch (error) {
            console.error('Error in refundTransaction:', error);
            throw error;
        }
    }

    /**
     * Voids a transaction.
     * 
     * API Reference - https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#voidTransaction
     *
     * @param {Object} params The void parameters
     * @returns {Promise<IVoidTransactionResponse>} A promise resolving to the void response
     */
    async voidTransaction(params: { clientUniqueId: string; amount: string; currency: string; relatedTransactionId: string; comment?: string; }): Promise<IVoidTransactionResponse> {
        try {
            const merchantId = NuveiEnvironment.getMerchantId();
            const merchantSiteId = NuveiEnvironment.getMerchantSiteId();
            const clientRequestId = ChecksumUtil.generateClientRequestId();
            const timeStamp = ChecksumUtil.getCurrentTimestamp();

            const checksum = ChecksumUtil.generateVoidChecksum( merchantId, merchantSiteId, clientRequestId, params.clientUniqueId, params.amount, params.currency, params.relatedTransactionId, timeStamp );

            const request: IVoidTransactionRequest = { merchantId, merchantSiteId, clientRequestId, clientUniqueId: params.clientUniqueId, amount: params.amount, currency: params.currency, relatedTransactionId: params.relatedTransactionId, timeStamp, checksum, comment: params.comment };

            const response = await Api.call( Endpoints.Payment.VOID_TRANSACTION, RequestMethod.POST, request, {}, { 'Content-Type': 'application/json' } );

            return response;
        } catch (error) {
            console.error('Error in voidTransaction:', error);
            throw error;
        }
    }

    /**
     * Legacy method - kept for backward compatibility
     * @deprecated Use the specific methods like openOrder, updateOrder, etc.
     */
    request(data: any) {
        throw new Error("Method deprecated. Use openOrder() to initiate a payment session.");
    }

    /**
     * Legacy method - kept for backward compatibility
     * @deprecated Use getPaymentStatus() instead
     */
    async getDetails(data: any): Promise<any> {
        try {
            const paymentDetails = await this.getPaymentStatus(data)
            return paymentDetails;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    /**
     * Gets the payment status for a session.
     * 
     * API Reference - https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#getPaymentStatus
     *
     * @param {string} sessionToken The session token
     * @returns {Promise<IGetPaymentStatusResponse>} A promise resolving to the payment status
     */
    private async getPaymentStatus(sessionToken: string): Promise<IGetPaymentStatusResponse> {
        try {
            const merchantId = NuveiEnvironment.getMerchantId();
            const merchantSiteId = NuveiEnvironment.getMerchantSiteId();
            const clientRequestId = ChecksumUtil.generateClientRequestId();
            const timeStamp = ChecksumUtil.getCurrentTimestamp();

            const checksum = ChecksumUtil.generatePaymentStatusChecksum( merchantId, merchantSiteId, clientRequestId, timeStamp );

            const request: IGetPaymentStatusRequest = { sessionToken, merchantId, merchantSiteId, clientRequestId, timeStamp, checksum };

            const response = await Api.call( Endpoints.Payment.GET_PAYMENT_STATUS, RequestMethod.POST, request, {}, { 'Content-Type': 'application/json' } );

            return response;
        } catch (error) {
            console.error('Error in getPaymentStatus:', error);
            throw error;
        }
    }

    /**
     * Gets detailed information about a specific transaction.
     * Can query by either transactionId or clientUniqueId.
     * If multiple transactions share the same clientUniqueId, only the most recent is returned.
     *
     * API Reference - https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#getTransactionDetails
     *
     * @param {Object} params The query parameters
     * @param {string} params.transactionId - The Gateway transaction ID (conditional - either this or clientUniqueId required)
     * @param {string} params.clientUniqueId - The unique transaction ID in merchant system (conditional - either this or transactionId required)
     * @returns {Promise<IGetTransactionDetailsResponse>} A promise resolving to the transaction details
     */
    async getTransactionDetails(params: { transactionId?: string; clientUniqueId?: string; }): Promise<IGetTransactionDetailsResponse> {
        try {
            // // Validate that at least one identifier is provided
            // if (!params.transactionId && !params.clientUniqueId) {
            //     throw new Error("Either transactionId or clientUniqueId must be provided");
            // }

            const merchantId = NuveiEnvironment.getMerchantId();
            const merchantSiteId = NuveiEnvironment.getMerchantSiteId();
            const timeStamp = ChecksumUtil.getCurrentTimestamp();

            const checksum = ChecksumUtil.generateTransactionDetailsChecksum(merchantId, merchantSiteId, params.transactionId, params.clientUniqueId, timeStamp);

            const request: IGetTransactionDetailsRequest = { merchantId, merchantSiteId, timeStamp, checksum, ...(params.transactionId && { transactionId: params.transactionId }), ...(params.clientUniqueId && { clientUniqueId: params.clientUniqueId }) };

            const response = await Api.call(Endpoints.Payment.GET_TRANSACTION_DETAILS, RequestMethod.POST, request, {}, { 'Content-Type': 'application/json' });

            return response;
        } catch (error) {
            console.error('Error in getTransactionDetails:', error);
            throw error;
        }
    }

    /**
     * Registers or retrieves Google Pay domains for the merchant.
     * This endpoint is used to manage the list of domains that can process Google Pay transactions.
     * When called without domains parameter, it returns the currently registered domains.
     * When called with domains parameter, it registers/updates the domain list.
     *
     * API Reference - https://docs.nuvei.com/api/advanced/indexAdvanced.html?json#registerGooglePayDomains
     *
     * @param {Object} params The parameters for domain registration
     * @param {string[]} params.domainNames - Optional array of domains to register. If not provided, returns current domains.
     * @param {boolean} params.agreedToGooglePayTermsAndConditions - Required. Indicates merchant agreement to Google Pay terms.
     * @returns {Promise<IRegisterGooglePayDomainsResponse>} A promise resolving to the response with domain list
     *
     * @example
     * // Register new domains
     * const result = await transaction.registerGooglePayDomains({
     *     domainNames: ["example.com", "www.example.com", "checkout.example.com"],
     *     agreedToGooglePayTermsAndConditions: true
     * });
     *
     * @example
     * // Get current registered domains
     * const result = await transaction.registerGooglePayDomains({
     *     agreedToGooglePayTermsAndConditions: true
     * });
     */
    async registerGooglePayDomains(params: { domainNames?: string[]; agreedToGooglePayTermsAndConditions?: boolean; } = {}): Promise<IRegisterGooglePayDomainsResponse> {
        try {
            const merchantId = NuveiEnvironment.getMerchantId();
            const merchantSiteId = NuveiEnvironment.getMerchantSiteId();
            const clientRequestId = ChecksumUtil.generateClientRequestId();
            const timeStamp = ChecksumUtil.getCurrentTimestamp();

            // Use provided domainNames or empty array
            const domainNames = params.domainNames || [];
            const agreedToTerms = params.agreedToGooglePayTermsAndConditions !== undefined ? params.agreedToGooglePayTermsAndConditions : true;

            // Build checksum array - convert domainNames array to concatenated string
            const checksumParams = [
                merchantId,
                merchantSiteId,
                clientRequestId,
                domainNames.join(''),  // Concatenate domain names
                agreedToTerms.toString(),
                timeStamp
                // Note: merchantSecretKey is automatically appended by generateChecksum()
            ];

            const checksum = ChecksumUtil.generateChecksum(checksumParams);

            const request: IRegisterGooglePayDomainsRequest = {
                merchantId,
                merchantSiteId,
                clientRequestId,
                timeStamp,
                checksum,
                domainNames,  // Always include domainNames field
                agreedToGooglePayTermsAndConditions: agreedToTerms
            };

            const response = await Api.call(Endpoints.Payment.REGISTER_GOOGLE_PAY_DOMAINS, RequestMethod.POST, request, {}, { 'Content-Type': 'application/json' });

            return response;
        } catch (error) {
            console.error('Error in registerGooglePayDomains:', error);
            throw error;
        }
    }

    /**
     * Gets Google Pay merchant info JWT for secure domain registration.
     * This JWT solution allows Nuvei to dynamically enable unlimited web domains
     * without having to register each one in Google Pay and Wallet consoles.
     * The merchant receives a registered domain and JWT for each transaction.
     *
     * API Reference - https://docs.nuvei.com/api/advanced/indexAdvanced.html?json#googlePayMerchantInfoJwt
     *
     * @param {Object} params The parameters for getting merchant info JWT
     * @param {string} params.sessionToken The session token from openOrder
     * @param {string} params.merchantOrigin The merchant's domain origin
     * @returns {Promise<IGetGooglePayMerchantInfoJwtResponse>} A promise resolving to the merchant info with JWT
     *
     * @example
     * // Get merchant info JWT for Google Pay
     * const result = await transaction.getGooglePayMerchantInfoJwt({
     *     sessionToken: sessionToken,
     *     merchantOrigin: "yourdomain.com"
     * });
     * // Use result.merchantInfo in Google Pay PaymentDataRequest:
     * // {
     * //   merchantName: "Your Store",
     * //   merchantId: "BCR2DN4XXXXXXXXX",
     * //   authJwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
     * //   merchantOrigin: "https://yourdomain.com"
     * // }
     */
    async getGooglePayMerchantInfoJwt(params: { sessionToken: string; merchantOrigin: string; }): Promise<IGetGooglePayMerchantInfoJwtResponse> {
        try {
            const request: IGetGooglePayMerchantInfoJwtRequest = { sessionToken: params.sessionToken, merchantOrigin: params.merchantOrigin };

            const response = await Api.call( Endpoints.Payment.GET_GOOGLE_PAY_MERCHANT_INFO_JWT, RequestMethod.GET, request, {}, { 'Content-Type': 'application/json' } );

            return response;
        } catch (error) {
            console.error('Error in getGooglePayMerchantInfoJwt:', error);
            throw error;
        }
    }
}