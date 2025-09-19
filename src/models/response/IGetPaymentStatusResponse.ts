export default interface IGetPaymentStatusResponse {
    transactionStatus?: string;
    transactionId?: string;
    transactionType?: string;
    amount?: string;
    currency?: string;
    clientUniqueId?: string;
    authCode?: string;
    merchantId?: string;
    merchantSiteId?: string;
    status?: string;
    errCode?: number;
    reason?: string;
    version?: string;
    clientRequestId?: string;
    internalRequestId?: number;
}