export default interface IRegisterGooglePayDomainsResponse {
    merchantId: string;
    merchantSiteId: string;
    clientRequestId: string;
    version: string;
    status: string;
    errCode?: number;
    reason?: string;
    domains?: string[];
    internalRequestId?: number;
}