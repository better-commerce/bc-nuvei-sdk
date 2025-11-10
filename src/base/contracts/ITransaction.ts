
import { IOpenOrderResponse, IUpdateOrderResponse, IGetPaymentStatusResponse, IRefundTransactionResponse, IVoidTransactionResponse, IGetSessionTokenResponse, IGetTransactionDetailsResponse, IRegisterGooglePayDomainsResponse, IGetGooglePayMerchantInfoJwtResponse, IUnregisterGooglePayDomainsResponse, IGetRegisteredGooglePayDomainsResponse, IApplePayMerchantValidationResponse, IAddress, IUserDetails, IUrlDetails } from "../../models";

export interface ITransaction {

    /**
     * Gets a session token for server-to-server API authentication.
     * @returns {Promise<IGetSessionTokenResponse>}
     */
    getSessionToken(): Promise<IGetSessionTokenResponse>;

    /**
     * Initiates an order session for payment processing.
     * @param params {Object} The order parameters
     * @returns {Promise<IOpenOrderResponse>}
     */
    openOrder(params: { clientUniqueId: string; currency: string; amount: string; userDetails?: IUserDetails; billingAddress?: IAddress; shippingAddress?: IAddress; urlDetails?: IUrlDetails; country?: string; email?: string; transactionType?: string; isRebilling?: string; }): Promise<IOpenOrderResponse>;

    /**
     * Updates an existing order with new details.
     * @param params {Object} The update order parameters
     * @returns {Promise<IUpdateOrderResponse>}
     */
    updateOrder(params: { sessionToken: string; clientUniqueId: string; currency?: string; amount?: string; items?: any[]; userDetails?: IUserDetails; billingAddress?: IAddress; shippingAddress?: IAddress; }): Promise<IUpdateOrderResponse>;

    /**
     * Refunds a transaction.
     * @param params {Object} The refund parameters
     * @returns {Promise<IRefundTransactionResponse>}
     */
    refundTransaction(params: { clientUniqueId: string; amount: string; currency: string; relatedTransactionId: string; comment?: string; }): Promise<IRefundTransactionResponse>;

    /**
     * Voids a transaction.
     * @param params {Object} The void parameters
     * @returns {Promise<IVoidTransactionResponse>}
     */
    voidTransaction(params: { clientUniqueId: string; amount: string; currency: string; relatedTransactionId: string; comment?: string; }): Promise<IVoidTransactionResponse>;

    /**
     * Initiates a transaction request.
     * @deprecated Use the specific methods like openOrder, getSessionToken, etc.
     * @param data {Object}
     */
    request(data: any): any;

    /**
     * Gets the payment details for a session.
     * @param sessionToken {String} The session token
     * @returns {Promise<IGetPaymentStatusResponse>}
     */
    getDetails(data: any): any;

    /**
     * Gets detailed information about a specific transaction.
     * Can query by either transactionId or clientUniqueId.
     * @param params {Object} The query parameters
     * @param params.transactionId {String} The Gateway transaction ID (conditional)
     * @param params.clientUniqueId {String} The unique transaction ID in merchant system (conditional)
     * @returns {Promise<IGetTransactionDetailsResponse>}
     */
    getTransactionDetails(params: { transactionId?: string; clientUniqueId?: string; }): Promise<IGetTransactionDetailsResponse>;

    /**
     * Registers or retrieves Google Pay domains for the merchant.
     * @param params {Object} The parameters for domain registration
     * @param params.domainNames {String[]} Optional array of domains to register
     * @param params.agreedToGooglePayTermsAndConditions {Boolean} Indicates merchant agreement to Google Pay terms
     * @returns {Promise<IRegisterGooglePayDomainsResponse>}
     */
    registerGooglePayDomains(params?: { domainNames?: string[]; agreedToGooglePayTermsAndConditions?: boolean; }): Promise<IRegisterGooglePayDomainsResponse>;

    /**
     * Gets Google Pay merchant info JWT for secure domain registration.
     * @param params {Object} The parameters for getting merchant info JWT
     * @param params.sessionToken {String} The session token from openOrder
     * @param params.merchantOrigin {String} The merchant's domain origin
     * @returns {Promise<IGetGooglePayMerchantInfoJwtResponse>}
     */
    getGooglePayMerchantInfoJwt(params: { sessionToken: string; merchantOrigin: string; }): Promise<IGetGooglePayMerchantInfoJwtResponse>;

    /**
     * Unregisters Google Pay domains for the merchant.
     * @param params {Object} The parameters for domain unregistration
     * @param params.domainNames {String[]} Array of domains to unregister
     * @returns {Promise<IUnregisterGooglePayDomainsResponse>}
     */
    unregisterGooglePayDomains(params: { domainNames: string[]; }): Promise<IUnregisterGooglePayDomainsResponse>;

    /**
     * Gets the list of registered Google Pay domains for the merchant.
     * @param params {Object} The parameters for retrieving registered domains
     * @param params.domainNames {String[]} Optional array of specific domains to query
     * @returns {Promise<IGetRegisteredGooglePayDomainsResponse>}
     */
    getRegisteredGooglePayDomains(params?: { domainNames?: string[]; }): Promise<IGetRegisteredGooglePayDomainsResponse>;

    /**
     * Validates Apple Pay merchant session with Nuvei.
     * @param params {Object} The parameters for Apple Pay merchant validation
     * @param params.sessionToken {String} The session token from openOrder
     * @param params.validationURL {String} The validation URL from Apple's onvalidatemerchant event
     * @param params.merchantName {String} Optional merchant display name
     * @returns {Promise<IApplePayMerchantValidationResponse>}
     */
    applePayMerchantValidation(params: { sessionToken: string; validationURL: string; merchantName?: string; }): Promise<IApplePayMerchantValidationResponse>;
}