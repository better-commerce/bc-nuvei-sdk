export default interface IGetRegisteredGooglePayDomainsResponse {
    internalRequestId?: number;
    status: string;
    errCode?: number;
    reason?: string;
    merchantId?: string;
    merchantSiteId?: string;
    version?: string;
    clientRequestId?: string;
    domainNames?: string[];
}