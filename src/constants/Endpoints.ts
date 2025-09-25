export namespace Endpoints {
    export namespace Base {
        export namespace Api {
            export const SANDBOX_URL = "https://ppp-test.safecharge.com";
            export const PRODUCTION_URL = "https://secure.safecharge.com";
        };
    };

    export namespace Payment {
        export const OPEN_ORDER = "/ppp/api/openOrder.do";
        export const UPDATE_ORDER = "/ppp/api/updateOrder";
        export const GET_PAYMENT_STATUS = "/ppp/api/getPaymentStatus";
        export const REFUND_TRANSACTION = "/ppp/api/refundTransaction";
        export const VOID_TRANSACTION = "/ppp/api/voidTransaction";
        export const GET_SESSION_TOKEN = "/ppp/api/getSessionToken.do";
        export const GET_TRANSACTION_DETAILS = "/ppp/api/v1/getTransactionDetails.do";
        export const REGISTER_GOOGLE_PAY_DOMAINS = "/ppp/api/v1/registerGooglePayDomains.do";
    };
}