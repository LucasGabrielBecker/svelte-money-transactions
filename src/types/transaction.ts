export type Transaction = {
	id: string;
	title: string;
	description: string;
	status: string;
	amount: number;
	date: string;
	from: string;
	to: string;
};

export enum Events {
	TRANSACTION_DETAILS = 'TRANSACTION_DETAILS'
}
