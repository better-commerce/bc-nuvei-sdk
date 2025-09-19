// Other Imports
import { Api } from "../api";
import { RequestMethod } from "../constants/enums";
import { ITransaction } from "../base/contracts/ITransaction";
import { IOpenOrderRequest, IOpenOrderResponse, IUpdateOrderRequest, IUpdateOrderResponse, IGetPaymentStatusRequest, IGetPaymentStatusResponse, IRefundTransactionRequest, IRefundTransactionResponse, IVoidTransactionRequest, IVoidTransactionResponse, IAddress, IUserDetails, IUrlDetails, IGetSessionTokenRequest, IGetSessionTokenResponse } from "../models";
import NuveiEnvironment from "../base/config/NuveiEnvironment";
import { ChecksumUtil } from "../utils/checksum";
import { Endpoints } from "../constants/Endpoints";


export default class Transaction implements ITransaction {

    /**
     * Gets a session token for server-to-server API authentication.
     * This token is required for subsequent API calls in the server-to-server flow.
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
}