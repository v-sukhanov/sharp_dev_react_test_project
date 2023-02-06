import { Alert, AlertTitle } from '@mui/lab';
import React from 'react';
import { IUser, IUserInfoResponse } from '../../shared/models/user';

export interface INewTransactionAlert {
	showSuccess: boolean;
	isError: boolean;
	userInfo?: IUserInfoResponse;
	amount: number;
}

export const NewTransactionAlert = ({showSuccess, userInfo, amount, isError}: INewTransactionAlert) => {
	return <>
		{
			(userInfo?.balance ?? 0) < amount &&
            <Alert sx={{marginTop: '25px'}} severity="error">
                <AlertTitle>Error</AlertTitle>
                The transaction amount is greater than your balance
            </Alert>
		}
		{
			isError &&
            <Alert sx={{marginTop: '25px'}} severity="error">
                <AlertTitle>Error</AlertTitle>
				{
					//@ts-ignore
					error?.data
				}
            </Alert>
		}
		{
			showSuccess &&
            <Alert sx={{marginTop: '25px'}} severity="success">The transaction has been successfully created!</Alert>
		}
	</>
}