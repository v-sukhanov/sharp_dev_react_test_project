

export interface ISignUpRequest {
	email: string;
	username: string;
	password: string;
}

export interface ISignUpResponse {
	id_token: string;
}

export interface ISignInRequest {
	email: string;
	password: string;
}

export interface ISignInResponse {
	id_token: string;
}

export interface IUserInfoResponse {
	id:string;
	name: string;
	email: string;
	balance: string;
}

export interface IUsersRequest {
	filter: string;
}


export interface IUser {
	id: string;
	name: string
}

export interface ICreateTransactionRequest {
	name: string;
	amount: number;
}

export interface ICreateTransactionResponse {
	trans_token: ICreateTransactionToken;
}

export interface ICreateTransactionToken {
	id: string;
	date:string;
	username: string;
	amount: number;
	balance: number;
}