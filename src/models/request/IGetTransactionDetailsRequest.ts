export default interface IGetTransactionDetailsRequest {
    merchantId: string;
    merchantSiteId: string;
    timeStamp: string;
    checksum: string;

    // Conditional - either transactionId or clientUniqueId must be provided
    clientUniqueId?: string;
    transactionId?: string;
}