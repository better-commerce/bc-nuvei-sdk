export default interface IVoidTransactionResponse {
    transactionId?: string;
    transactionStatus?: string;
    authCode?: string;
    merchantId?: string;
    merchantSiteId?: string;
    clientUniqueId?: string;
    clientRequestId?: string;
    internalRequestId?: number;
    status?: string;
    errCode?: number;
    reason?: string;
    version?: string;
}