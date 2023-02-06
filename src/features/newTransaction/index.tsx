import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { NewTransactionSearch } from './NewTransactionSearch';
import { OutlinedAmountInput } from '../../shared/components/OutlinedAmountInput';
import { useQueryParams } from '../../shared/hooks/queryParams';
import { IUser } from '../../shared/models/user';
import { NewTransactionAlert } from './NewTransactionAlert';
import { useLazyUserInfoQuery, useUserInfoQuery } from '../../shared/api/endpoints/user.endpoints';
import { useLazyCreateTransactionQuery, useLazyUsersQuery } from '../../shared/api/endpoints/transaction.endpoints';

export const NewTransaction = () => {
	const queryParams = useQueryParams();

	const [postUserRequest] = useLazyUsersQuery()
	const [initialAmount, setInitialAmount] = useState(0);
	const [amount, setAmount] = useState(0);
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
	const [createTransactionRequest, {isLoading, isError}] = useLazyCreateTransactionQuery();
	const [getUserInfoRequest] = useLazyUserInfoQuery()
	const [showSuccess, setShowSuccess] = useState(false);
	const { data: userInfo } = useUserInfoQuery()

	useEffect(() => {
		const val = queryParams.get('amount');
		if (val) {
			setInitialAmount(parseFloat(val));
			setAmount(parseFloat(val));
		}

	}, [queryParams.get('amount')])

	useEffect(() => {
		const val = queryParams.get('name');
		if (val) {
			postUserRequest({
				filter: val
			})
				.unwrap()
				.then((data) => {
					if (data?.length) {
						setSelectedUser(data[0])
					}
				})

		}

	}, [queryParams.get('name')])

	const userChanged = (user: IUser | null) => {
		setSelectedUser(user)
	}

	const handleCreateTransaction = () => {
		if (!selectedUser) {
			return ;
		}
		createTransactionRequest({
			name: selectedUser.name,
			amount
		})
			.unwrap()
			.then(async () => {
				getUserInfoRequest();
				setShowSuccess(true);
				await new Promise(resolve => {
					setTimeout(() => { resolve('') }, 5000);
				})
				setShowSuccess(false);
			})
	}

	return <div>
		<Typography sx={{marginBottom: '10px'}}>
			Please select a user for the transaction
		</Typography>
		<NewTransactionSearch selectUser={userChanged}/>
		{
			selectedUser &&
			<div className="mt-10">
                <Typography sx={{opacity: .5}}>
                    recipient:
                </Typography>
				<Typography sx={{marginBottom: '25px'}} variant="h5">
					{selectedUser.name}
				</Typography>
				<OutlinedAmountInput initialValue={initialAmount} key={'amount_input'} amountChange={setAmount}/>
				<NewTransactionAlert
					userInfo={userInfo}
					amount={amount}
					showSuccess={showSuccess}
					isError={isError}
				></NewTransactionAlert>
                <LoadingButton
	                loading={isLoading}
	                disabled={amount < 1 || (userInfo?.balance ?? 0) < amount}
	                sx={{marginTop: '25px'}}
	                fullWidth
	                variant="contained"
	                onClick={handleCreateTransaction}
                >
                    Send
                </LoadingButton>
			</div>
		}
	</div>
}