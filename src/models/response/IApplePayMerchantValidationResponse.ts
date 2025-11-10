export interface IApplePayMerchantValidationResponse {
    merchantId?: string;
    merchantSiteId?: string;
    internalRequestId?: number;
    status?: string;
    errCode?: number;
    reason?: string;
    version?: string;
    clientRequestId?: string;
    sessionToken?: string;
    merchantSession?: any; // Apple merchant session object returned by Nuvei
}
