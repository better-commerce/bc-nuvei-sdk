export default interface IGetPaymentStatusRequest {
    sessionToken: string;
    merchantId: string;
    merchantSiteId: string;
    clientRequestId: string;
    timeStamp: string;
    checksum: string;
}