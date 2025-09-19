export default interface IOpenOrderResponse {
    sessionToken?: string;
    orderId?: string;
    merchantId?: string;
    merchantSiteId?: string;
    clientUniqueId?: string;
    clientRequestId?: string;
    status?: string;
    errCode?: number;
    reason?: string;
    version?: string;
    internalRequestId?: number;
}