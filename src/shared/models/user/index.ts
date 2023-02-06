

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