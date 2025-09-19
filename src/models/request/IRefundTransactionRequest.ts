import IMerchantDetails from "../IMerchantDetails";
import IUrlDetails from "../IUrlDetails";

export default interface IRefundTransactionRequest {
    merchantId: string;
    merchantSiteId: string;
    clientRequestId: string;
    clientUniqueId: string;
    amount: string;
    currency: string;
    relatedTransactionId: string;
    timeStamp: string;
    checksum: string;

    // Optional fields
    comment?: string;
    merchantDetails?: IMerchantDetails;
    urlDetails?: IUrlDetails;
}