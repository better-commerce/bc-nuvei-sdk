import * as crypto from 'crypto';
import NuveiEnvironment from '../base/config/NuveiEnvironment';

/**
 * Utility class for generating checksums for Nuvei API requests
 */
export class ChecksumUtil {

    /**
     * Generate SHA-256 checksum for request authentication
     * @param params - Array of parameters to include in checksum
     * @returns SHA-256 hash string
     */
    static generateChecksum(params: string[]): string {
        const concatenatedString = params.join('') + NuveiEnvironment.getMerchantSecretKey();
        return crypto.createHash('sha256').update(concatenatedString).digest('hex');
    }

    /**
     * Generate checksum for getSessionToken request
     */
    static generateSessionTokenChecksum(merchantId: string, merchantSiteId: string, clientRequestId: string, timeStamp: string): string {
        return this.generateChecksum([merchantId, merchantSiteId, clientRequestId, timeStamp]);
    }

    /**
     * Generate checksum for openOrder request
     */
    static generateOpenOrderChecksum(merchantId: string, merchantSiteId: string, clientRequestId: string, amount: string, currency: string, timeStamp: string): string {
        return this.generateChecksum([merchantId, merchantSiteId, clientRequestId, amount, currency, timeStamp]);
    }

    /**
     * Generate checksum for payment status request
     */
    static generatePaymentStatusChecksum(merchantId: string, merchantSiteId: string, clientRequestId: string, timeStamp: string): string {
        return this.generateChecksum([merchantId, merchantSiteId, clientRequestId, timeStamp]);
    }

    /**
     * Generate checksum for refund transaction
     */
    static generateRefundChecksum(merchantId: string, merchantSiteId: string, clientRequestId: string, clientUniqueId: string, amount: string, currency: string, relatedTransactionId: string, timeStamp: string): string {
        return this.generateChecksum([merchantId, merchantSiteId, clientRequestId, clientUniqueId, amount, currency, relatedTransactionId, timeStamp]);
    }

    /**
     * Generate checksum for void transaction
     */
    static generateVoidChecksum(merchantId: string, merchantSiteId: string, clientRequestId: string, clientUniqueId: string, amount: string, currency: string, relatedTransactionId: string, timeStamp: string): string {
        return this.generateChecksum([merchantId, merchantSiteId, clientRequestId, clientUniqueId, amount, currency, relatedTransactionId, timeStamp]);
    }

    /**
     * Generate current timestamp in Nuvei format
     * @returns Timestamp string in YYYYMMDDHHmmss format
     */
    static getCurrentTimestamp(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }

    /**
     * Generate a unique request ID
     * @returns Unique request ID string
     */
    static generateClientRequestId(): string {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}