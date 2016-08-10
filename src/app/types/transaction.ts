export interface Transaction {
	/** Account owner of this transaction */
	accountNumber: string,
	/** The amount of this transaction */
	amount: number,
	/** The date this transaction was effective */
	effectiveDate: string,
	/** The sate this transaction was created */
	postDate: string,
	/** The payee name for this transaction */
	payeeName: string,
	/** Source code of this transaction */
	sourceCode: string,
	/** The code identifier for this transaction */
	transactionCode: string,
	/** The code identifier description for this transaction */
	transactionCodeDescription: string,
	/** The status of this transaction */
	transactionStatus: string,
	/** Transaction description */
	description: string,
	/** The type of this transaction */
	type: string,
	/** Whether the transactions is deposit */
	isDeposit: boolean,
	/** Whether the transactions is still pending */
	isPending: boolean
}