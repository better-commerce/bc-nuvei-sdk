import { Endpoints } from "../../constants/Endpoints";


/**
 * {NuveiEnvironment} class is used to setup the environment.
 * This class provides options to select the environment.
 */
export default class NuveiEnvironment {

    // Static variables
    static merchantId: string;
    static merchantSiteId: string;
    static merchantSecretKey: string;

    static environment: string;
    static extras: any;

    /**
     * Field to store the Nuvei api base url.
     * @property {string}
     */
    static baseUrl: string;

    static init(merchantId: string, merchantSiteId: string, merchantSecretKey: string, useSandBox = true, extras = {}) {
        NuveiEnvironment.merchantId = merchantId;
        NuveiEnvironment.merchantSiteId = merchantSiteId;
        NuveiEnvironment.merchantSecretKey = merchantSecretKey;
        NuveiEnvironment.extras = extras;

        if (useSandBox) {
            NuveiEnvironment.baseUrl = Endpoints.Base.Api.SANDBOX_URL;
            NuveiEnvironment.environment = "sandbox";
        } else {
            NuveiEnvironment.baseUrl = Endpoints.Base.Api.PRODUCTION_URL;
            NuveiEnvironment.environment = "production";
        }
        return this;
    }

    /**
     * Get the merchantId set in the NuveiEnvironment.
     * @returns {string} The merchant ID.
     */
    static getMerchantId(): string {
        return NuveiEnvironment.merchantId;
    }

    /**
     * Get the merchantSiteId set in the NuveiEnvironment.
     * @returns {string} The merchant site ID.
     */
    static getMerchantSiteId(): string {
        return NuveiEnvironment.merchantSiteId;
    }

    /**
     * Get the merchantSecretKey set in the NuveiEnvironment.
     * @returns {string} The merchant secret key.
     */
    static getMerchantSecretKey(): string {
        return NuveiEnvironment.merchantSecretKey;
    }

    /**
     * Get any additional configuration options that were passed in the constructor.
     * @returns {Object} The additional configuration options.
     */
    static getExtras(): any {
        return NuveiEnvironment.extras;
    }

    /**
     * Get the current environment being used in the NuveiEnvironment.
     * @returns {string} The current environment, either "sandbox" or "production".
     */
    static getEnvironment(): string {
        return NuveiEnvironment.environment;
    }
    
    /**
     * Get the URL of the API service.
     * @returns {string} The URL of the API service.
     */
    static getBaseUrl(): string {
        return NuveiEnvironment.baseUrl;
    }
}