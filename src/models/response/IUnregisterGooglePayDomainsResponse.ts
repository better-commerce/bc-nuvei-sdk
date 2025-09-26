export interface IUnregisterGooglePayDomainsResponse {
    internalRequestId?: number;
    status: string;
    errCode?: number;
    reason?: string;
    merchantId: string;
    merchantSiteId: string;
    version: string;
    clientRequestId?: string;
    domains?: Array<{
        domainName: string;
        status: string;
        errCode?: number;
        reason?: string;
    }>;
    merchantName?: string;
}