export interface IApplePayMerchantValidationRequest {
    sessionToken: string;
    merchantId: string;
    merchantSiteId: string;
    validationURL: string;
    merchantName?: string;
    clientRequestId?: string;
    timeStamp?: string;
    checksum?: string;
}
