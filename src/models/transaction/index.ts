export interface ICreateTransactionRequest {
	name: string;
	amount: number;
}

export interface ICreateTransactionToken {
	id: string;
	date: string;
	username: string;
	amount: number;
	balance: number;
}

export interface ICreateTransactionResponse {
	trans_token: ICreateTransactionToken;
}