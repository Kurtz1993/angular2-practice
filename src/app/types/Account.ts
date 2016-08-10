export interface Account {
    /** Account type. E.g. Checking.*/
    accountType?: string;
    /** Indicates if the account is active. */
    active?: boolean;
    /** Account total balance. This doesn't take in account the pending transactions. */
    amount?: number;
    /** Account available balance. Calculated by including the pending transactions. */
    availableBalance?: number;
    /** ID that identifies user accounts. There's one CIF per user. */
    cif?: string;
    /** Name of the customer. */
    customerName?: string;
    /** Indicates if the account is enrolled for pay bills. */
    enrolledInBillPay?: boolean;
    /** Unique ID for the account. */
    id?: string;
    /** Account name. */
    name?: string;
    /** Account nickname. */
    nickname?: string;
    /** Account number. */
    number?: string;
    /** Account routing number. Useful for communication between JH and Payveris. */
    routingNumber?: string;
    /** Account status. */
    status?: string;
    /** Account status code. */
    statusCode?: string;
}