import IAddress from "../IAddress";
import IMerchantDetails from "../IMerchantDetails";
import IUserDetails from "../IUserDetails";

export default interface IUpdateOrderRequest {
    merchantId: string;
    merchantSiteId: string;
    sessionToken: string;
    clientRequestId: string;
    clientUniqueId: string;
    timeStamp: string;
    checksum: string;

    // Optional fields
    currency?: string;
    amount?: string;
    items?: any[];
    userDetails?: IUserDetails;
    billingAddress?: IAddress;
    shippingAddress?: IAddress;
    merchantDetails?: IMerchantDetails;
    addendums?: any;
}