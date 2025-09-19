import IAddress from "../IAddress";
import IMerchantDetails from "../IMerchantDetails";
import IOpenAmount from "../IOpenAmount";
import IUrlDetails from "../IUrlDetails";
import IUserDetails from "../IUserDetails";

export default interface IOpenOrderRequest {
    merchantId: string;
    merchantSiteId: string;
    clientUniqueId: string;
    clientRequestId: string;
    currency: string;
    amount: string;
    timeStamp: string;
    checksum: string;

    // Optional fields
    userTokenId?: string;
    userDetails?: IUserDetails;
    billingAddress?: IAddress;
    shippingAddress?: IAddress;
    urlDetails?: IUrlDetails;
    openAmount?: IOpenAmount;
    transactionType?: string;
    isRebilling?: string;
    merchantDetails?: IMerchantDetails;
    addendums?: any;
    dynamicDescriptor?: any;
    preventOverride?: string;
    country?: string;
    email?: string;
}