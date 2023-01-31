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



