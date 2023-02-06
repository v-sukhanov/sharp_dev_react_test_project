import { UseFormRegisterReturn } from 'react-hook-form';
import React from 'react';
import { TextField } from '@mui/material';

export interface IStandardInputProps {
	label: string;
	error?: string;
	register?: UseFormRegisterReturn<string>;
}

export const StandardInput = ({label, error, register}: IStandardInputProps) => {
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