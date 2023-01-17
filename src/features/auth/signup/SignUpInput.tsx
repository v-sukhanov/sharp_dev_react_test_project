import { UseFormRegisterReturn } from 'react-hook-form';
import React from 'react';
import { TextField } from '@mui/material';

export interface ISignUpInputProps {
	label: string;
	error?: string;
	register: UseFormRegisterReturn<string>;
}

export const SignUpInput = ({label, error, register}: ISignUpInputProps) => {
	return <div className="mb-4">
		<TextField
			{...register}
			error={!!error}
			helperText={error}
			fullWidth
			label={label}
			variant="standard" />
	</div>
}