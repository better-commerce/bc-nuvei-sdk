export default interface IGetGooglePayMerchantInfoJwtResponse {
    merchantId: string;
    merchantSiteId: string;
    internalRequestId: number;
    status: string;
    errCode?: number;
    reason?: string;
    version: string;
    clientRequestId?: string;
    sessionToken?: string;
    merchantInfo?: {
        merchantName: string;
        merchantId: string;
        authJwt: string;
        merchantOrigin: string;
    };
}