import { SignUpInput } from './SignUpInput';
import { FormEvent } from 'react';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazySignUpQuery } from '../../../store/base.api';

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
	const [signUpMethod, {isLoading, data}] = useLazySignUpQuery();


	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onChange",
		resolver: yupResolver(signUpSchema)
	});

	const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		signUpMethod({
			email: "test@mail.ru",
			username: "test",
			password: "test"
		})
	}

	return (
		<form onSubmit={handleSignUp} className="border rounded p-10 shadow bg-white  w-[500px]">
			<h2 className="mb-8 text-2xl">
				Sign in
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
			<SignUpInput
				register={register('password', { required: true })}
				label="Password"
				error={errors?.password?.message?.toString()}
				type="password"
			/>
			<SignUpInput
				register={register('passwordConfirm', { required: true })}
				label="Confirm Password"
				error={errors?.passwordConfirm?.message?.toString()}
				type="password"
			/>
			<button className="rounded border bg-blue-500 w-full p-2 text-white mt-2">
				Sign up
			</button>
			<div className="mt-4">
				<span className="text-gray-500 text-sm">
					Already have an account? <br/> <a href="/auth/signin" className="underline">Sign up</a>
				</span>
			</div>
		</form>
	)
}