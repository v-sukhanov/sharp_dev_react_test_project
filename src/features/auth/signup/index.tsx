import { SignUpInput } from './SignUpInput';
import React, { FormEvent, useEffect } from 'react';
import * as yup from "yup";
import { FieldValue, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazySignUpQuery } from '../../../api/base.api';
import { SignUpPasswordInput } from './SignUpPasswordInput';
import { Alert, AlertTitle, LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useActions, useAppSelector } from '../../../store/hooks';

const signUpSchema = yup.object().shape({
	email: yup
		.string()
		.email('Invalid email format')
		.required('Email is required'),
	name: yup
		.string()
		.matches(/^([^0-9]*)$/, "Name should not contain numbers")
		.required("Name is a required field"),
	password: yup.string()
		.required('No password provided.')
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
	passwordConfirm: yup.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const SignUp = () => {
	const [signUpMethod, {isLoading, isError, error}] = useLazySignUpQuery();
	const {addToken} = useActions();
	const navigate = useNavigate()
	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onChange",
		resolver: yupResolver(signUpSchema)
	});

	const handleSignUp = (data: FieldValues) => {
		signUpMethod({
			email: data.email,
			username: data.name,
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
				Sign up
			</h2>
			<SignUpInput
				register={register('email', { required: true })}
				label="Email"
				error={errors?.email?.message?.toString()}
			/>
			<SignUpInput
				register={register('name', { required: true })}
				label="Name"
				error={errors?.name?.message?.toString()}
			/>
			<SignUpPasswordInput
				register={register('password', { required: true })}
				label="Password"
				error={errors?.password?.message?.toString()}
			/>
			<SignUpPasswordInput
				register={register('passwordConfirm', { required: true })}
				label="Confirm Password"
				error={errors?.passwordConfirm?.message?.toString()}
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

			<LoadingButton onClick={handleSubmit(handleSignUp)} fullWidth loading={isLoading} variant="contained">
				Sign up
			</LoadingButton>
			<div className="mt-4">
				<span className="text-gray-500 text-sm">
					Already have an account? <br/> <a href="/auth/signin" className="underline">Sign in</a>
				</span>
			</div>
		</form>
	)
}