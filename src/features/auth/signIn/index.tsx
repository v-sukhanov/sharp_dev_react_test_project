import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormEvent } from 'react';
import { SignUpInput } from '../signup/SignUpInput';
import * as yup from 'yup';

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
	const { register, handleSubmit, formState: { errors } } = useForm({
		mode: "onChange",
		resolver: yupResolver(signInSchema)
	});

	const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<form onSubmit={handleSignIn} className="border rounded p-10 shadow bg-white  w-[500px]">
			<h2 className="mb-8 text-2xl">
				Sign in
			</h2>
			<SignUpInput
				register={register('email', { required: true })}
				label="Email"
				error={errors?.email?.message?.toString()}
			/>
			<SignUpInput
				register={register('password', { required: true })}
				label="Password"
				error={errors?.password?.message?.toString()}
				type="password"
			/>
			<button className="rounded border bg-blue-500 w-full p-2 text-white mt-2">
				Sign In
			</button>
			<div className="mt-4">
				<span className="text-gray-500 text-sm">
					Need an account? <br/> <a href="/auth/signup" className="underline">Sign up</a>
				</span>
			</div>
		</form>
	)
}