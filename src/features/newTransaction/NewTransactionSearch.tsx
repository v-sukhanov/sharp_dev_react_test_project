import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useLazyUsersQuery } from '../../api/protected.api';
import { useDebounce } from '../../hooks/debounce';
import { IUser } from '../../models/user';

export interface INewTransactionSearchProps {
	selectUser: (user: IUser | null) => void;
	initialSearch?: string;
}

export const NewTransactionSearch = ({selectUser, initialSearch}: INewTransactionSearchProps) => {
	const [postUserRequest, {data}] = useLazyUsersQuery()
	const [search, setSearch] = useState(initialSearch ?? '');
	const debounced = useDebounce(search);

	useEffect(() => {
		if (debounced) {
			postUserRequest({
				filter: debounced
			})
		}
	}, [debounced])

	const userChanged = (user: IUser | null) => {
		selectUser(user);
	}
	return <Autocomplete
		options={data && search ? data : []}
		clearOnEscape
		getOptionLabel={(option: IUser) => option.name}
		onChange={(_e: React.SyntheticEvent, value: IUser | null) => userChanged(value)}
		renderInput={(params) => (
			<TextField
				onChange={e => setSearch(e.target.value)} {...params} label="User" variant="standard" />
		)}
	/>
}