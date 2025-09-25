export default interface IRegisterGooglePayDomainsRequest {
    merchantId: string;
    merchantSiteId: string;
    clientRequestId: string;
    timeStamp: string;
    checksum: string;
    domainNames?: string[];
    agreedToGooglePayTermsAndConditions?: boolean;
}