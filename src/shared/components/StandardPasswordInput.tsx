import React from 'react';
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IStandardInputProps } from './StandardInput';


export const StandardPasswordInput = ({label, error, register}: IStandardInputProps) => {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return <div className="mb-4">
		<div className="mt-1 flex items-center">
			<FormControl fullWidth variant="standard">
				<InputLabel error={!!error}>{label}</InputLabel>
				<Input
					{...register}
					error={!!error}
					type={showPassword ? 'text' : 'password'}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
				<FormHelperText error={!!error}>{error}</FormHelperText>
			</FormControl>

		</div>
	</div>
}