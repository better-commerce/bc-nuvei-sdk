export default interface IGetSessionTokenRequest {
    merchantId: string;
    merchantSiteId: string;
    clientRequestId: string;
    timeStamp: string;
    checksum: string;
}