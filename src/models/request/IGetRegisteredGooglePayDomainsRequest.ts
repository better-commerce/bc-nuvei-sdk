export default interface IGetRegisteredGooglePayDomainsRequest {
    merchantId: string;
    merchantSiteId: string;
    clientRequestId?: string;
    domainNames?: string[];
    timeStamp: string;
    checksum: string;
}