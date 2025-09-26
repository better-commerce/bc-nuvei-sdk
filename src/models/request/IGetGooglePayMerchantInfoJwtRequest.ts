export interface IGetGooglePayMerchantInfoJwtRequest {
    merchantId?: string;
    merchantSiteId?: string;
    merchantOrigin: string;
    sessionToken: string;
    clientRequestId?: string;
    timeStamp?: string;
    checksum?: string;
}