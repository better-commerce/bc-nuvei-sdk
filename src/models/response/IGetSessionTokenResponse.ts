export default interface IGetSessionTokenResponse {
    sessionToken?: string;
    internalRequestId?: number;
    status?: string;
    errCode?: number;
    reason?: string;
    merchantId?: string;
    merchantSiteId?: string;
    version?: string;
    clientRequestId?: string;
}