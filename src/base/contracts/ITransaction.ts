
import { IOpenOrderResponse, IUpdateOrderResponse, IGetPaymentStatusResponse, IRefundTransactionResponse, IVoidTransactionResponse, IGetSessionTokenResponse, IAddress, IUserDetails, IUrlDetails } from "../../models";

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
}