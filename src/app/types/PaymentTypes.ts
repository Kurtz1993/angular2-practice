export interface Biller {
    /** Address match is required. */
    addressMatchRequired?: boolean;
    /** Address match is required. */
    isAddressMatchRequired?: boolean;
    /** Address match required is specified. */
    addressMatchRequiredSpecified?: boolean;
    /** Biller nickname. */
    alias?: string;
    /** Biller id from payveris. */
    billerId?: number;
    /** Biller name. */
    billerName?: string;
    /** Biller address ID to attach to the biller. */
    billerAddressId?: number;
    /** Email address to associate with the biller. */
    emailAddress?: string;
    /** Biller name. */
    name?: string;
    /** A nickname for the biller. */
    nickName?: string;
    /** Payment account nickname. */
    paymentAccountHint?: string;
    /** Payment method ID from Payveris. */
    paymentMethod?: number;
    /** The account number to make the payment to. */
    paymentAccount?: string;
    /** The phone number to associate with the account. */
    phoneNumber?: string;
}

export interface Payee {
    // TODO: Get descriptions of these properties from payveris.
    billerId?: number;
    billerIdSpecified: boolean;
    billingAddress: BillerAddress;
    businessDaysToDeliver: number;
    canExpeditePayments: boolean;
    displayName: string;
    emailAddress: string;
    lastReturnDate: Date;
    lastReturnDateSpecified: boolean;
    nextAvailablePaymentDeliveryDate: Date;
    nextAvailablePaymentProcessingDate: Date;
    nickName?: string;
    payeeId: number;
    paymentAccount?: string;
    paymentAccountMask: string;
    paymentMethod: string;
}

export interface PaymentInfo {
    /** Account to take the money from. */
    account?: PaymentAccount;
    /** This should be the payee to make the payment to. */
    payee?: Payee;
    /** Amount for the transaction. */
    amount?: string;
    /** A little description or note for the payment. */
    memo?: string;
    /** The date in which the transaction is going to apply. */
    date?: Date;
}

export interface PaymentAccount {
    // TODO: Ask descriptions for these properties to Payveris.
    accessRole: string;
    accountStatus: string;
    balance: number;
    balanceAsOfDate: Date;
    balanceAsOfDateSpecified: boolean;
    balanceSpecified: boolean;
    coreSpecificAccountType: string;
    minimumPaymentDue: number;
    minimumPaymentDueSpecified: boolean;
    nickName: string;
    payBillsFrom: boolean;
    paymentDueDate: Date;
    paymentDueDateSpecified: boolean;
    primaryBillPaymentAccount: boolean;
    totalAmountDue: number;
    totalAmountDueSpecified: boolean;
    transferFrom: boolean;
    transferTo: boolean;
}

export interface PaymentResponse {
    any: any;
    errors: PayverisError[];
    requestId: string;
    responseStatus: number;
    scheduledPayment: any;
    timestamp: Date;
}

export interface PayverisError {
    code: string;
    displayMessage: string;
    message: string;
    severity: number;
}

export interface PopularBillerResponse {
    billerGroups: BillerGroup[];
    billers: Biller[];
    errors: any;
    requestId: string;
    responseStatus: number;
    timestamp: string;
}

export interface BillerGroup {
    addressMatchRequired: boolean;
    addressMatchRequiredSpecified: boolean;
    billerGroupId: number;
    billers: Biller[];
    displayName: string;
    paymentAccountHint: string;
}

export interface BillerAddress {
    /** Biller Address database ID. */
    id?: number,
    /** Biller database ID. */
    billerId?: number,
    /** Biller Address. */
    address?: string,
    /** Payee account number. */
    payeeAccount?: string,
    /** Biller address zip code. */
    zipCode?: string,
    /** Biller Address nickname. */
    nickname?: string,
    /** Biller email. */
    email?: string,
    /** Biller phone. */
    phone?: string,
    /** Require zip code. */
    isZipCodeRequired?: boolean
}