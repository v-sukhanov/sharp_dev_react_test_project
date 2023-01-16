import { UseFormRegisterReturn } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export interface ISignUpInputProps {
	label: string;
	error?: string;
	register: UseFormRegisterReturn<string>;
	type?: "password" | "string"
}

export const SignUpInput = ({label, error, register, type: initialInputType}: ISignUpInputProps) => {
	const [inputType, setInputType] = useState<"password" | "string">("string");
	useEffect(() => {
		setInputType(initialInputType ?? "string")
	}, [initialInputType])

	return <div className="mb-4">
		<div>
			<span className="text-gray-500">
				{label}
			</span>
		</div>
		<div className="mt-1 flex items-center">
			<input {...register} className={'w-full border rounded p-2' + (error ? " border-red-500" : "")} type={inputType}/>
			{
				initialInputType === 'password' &&
				(
					inputType === "string" ?
						<AiOutlineEyeInvisible  onClick={() => setInputType("password")} style={{marginLeft: "10px", cursor: "pointer"}} size={30}></AiOutlineEyeInvisible>
						: <AiOutlineEye onClick={() => setInputType("string")} style={{marginLeft: "10px", cursor: "pointer"}} size={30}></AiOutlineEye>
				)
			}
		</div>
		{
			error &&
			<div>
				<span className="text-red-500 text-sm">
					{error}
				</span>
			</div>
		}
	</div>
}