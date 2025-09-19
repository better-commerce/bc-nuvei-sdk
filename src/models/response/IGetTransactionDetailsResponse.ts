export default interface IGetTransactionDetailsResponse {
    // Base response fields
    internalRequestId?: number;
    status?: string;
    errCode?: number;
    merchantId?: string;
    merchantSiteId?: string;
    version?: string;

    // User details
    userDetails?: {
        userTokenId?: string;
    };

    // Device details
    deviceDetails?: {
        deviceName?: string;
        deviceOS?: string;
        deviceType?: string;
        ipAddress?: string;
    };

    // Currency conversion details
    currencyConversion?: {
        convertedCurrency?: string;
        convertedAmount?: string;
        originalAmount?: string;
        originalCurrencyCode?: string;
        rate?: string;
        markup?: {
            markup?: string;
            markupAmount?: string;
            amountWithoutMarkup?: string;
            markupAmountUSD?: string;
        };
    };

    isCurrencyConverted?: string;

    // Transaction details
    transactionDetails?: {
        date?: string;
        originalTransactionDate?: string;
        transactionStatus?: string;
        transactionType?: string;
        authCode?: string;
        clientUniqueId?: string;
        customData?: string;
        credited?: string;
        transactionId?: string;
        relatedTransactionId?: string;
        creditType?: string;
        acquiringBankName?: string;
        isVoided?: number;
        gwErrorCode?: number;
        gwExtendedErrorCode?: string;
        gwErrorReason?: string;
    };

    // Payment option details
    paymentOption?: {
        userPaymentOptionId?: string;
        card?: {
            bin?: string;
            ccCardNumber?: string;
            cardHolderName?: string;
            ccExpMonth?: string;
            ccExpYear?: string;
            cvv2Reply?: string;
            issuerBankName?: string;
            issuingCountry?: string;
            isPrepaid?: string;
            cardType?: string;
            cardBrand?: string;
            threeD?: {
                eci?: string;
                isLiabilityOnIssuer?: string;
                flow?: string;
                isExemptionRequestInAuthentication?: string;
                authenticationType?: string;
                authenticationStatus?: string;
                challengeCancelReason?: string;
                challengePreference?: string;
                challengePreferenceReason?: string;
                whiteListStatus?: string;
                exemptionRequest?: string;
                challengeStatus?: string;
            };
        };
    };

    // Partial approval details
    partialApproval?: {
        requestedAmount?: string;
        requestedCurrency?: string;
    };

    // Product details
    productDetails?: {
        productId?: string;
    };

    // Fraud details
    fraudDetails?: {
        fraudScore?: string;
        finalDecision?: string;
    };
}