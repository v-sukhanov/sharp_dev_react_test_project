import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FormEvent, useEffect } from 'react';
import { StandardInput } from '../../../shared/components/StandardInput';
import * as yup from 'yup';
import { StandardPasswordInput } from '../../../shared/components/StandardPasswordInput';
import { Alert, AlertTitle, LoadingButton } from '@mui/lab';
import { useLazySignInQuery, useLazySignUpQuery } from '../../../shared/api/base.api';
import { useActions } from '../../../shared/store/hooks';
import { useNavigate } from 'react-router-dom';

const signInSchema = yup.object().shape({
	email: yup
		.string()
		.email('Invalid email format')
		.required('Email is required'),
	password: yup.string()
		.required('No password provided.')
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
})

export const SignIn = () => {
	const [signInMethod, {isLoading, isError, error}] = useLazySignInQuery();
	const {addToken} = useActions();
	const navigate = useNavigate()

	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onChange",
		resolver: yupResolver(signInSchema)
	});

	const handleSignIn = (data: FieldValues) => {
		signInMethod({
			email: data.email,
			password: data.password
		}).unwrap()
			.then((payload) => {
				if (payload) {
					addToken(payload.id_token);
					navigate({
						pathname: '../../'
					})
				}
			})
	}

	return (
		<form className="border rounded p-10 shadow bg-white  w-[500px]">
			<h2 className="mb-8 text-2xl">
				Sign in
			</h2>
			<StandardInput
				register={register('email', { required: true })}
				label="Email"
				error={errors?.email?.message?.toString()}
			/>
			<StandardPasswordInput
				register={register('password', { required: true })}
				label="Password"
				error={errors?.password?.message?.toString()}
			/>
			{
				isError &&
                <Alert className="mb-5" severity="error">
                    <AlertTitle>Error</AlertTitle>
					{
						//@ts-ignore
						error?.data
					}
                </Alert>
			}
			<LoadingButton onClick={handleSubmit(handleSignIn)} fullWidth loading={isLoading} variant="contained">
				Sign in
			</LoadingButton>
			<div className="mt-4">
				<span className="text-gray-500 text-sm">
					Need an account? <br/> <a href="/auth/signup" className="underline">Sign up</a>
				</span>
			</div>
		</form>
	)
}