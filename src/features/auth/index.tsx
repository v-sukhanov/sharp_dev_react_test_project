import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { SignUp } from './signup';
import React from 'react';

export const Auth = () => {
	return <div className="min-h-screen box-border py-10 flex justify-center items-center">
		<Outlet></Outlet>
		{/*<Route path="/auth/signup" element={<SignUp/>}></Route>*/}
		{/*<Route path="/auth//signIn" element={<SignUp/>}></Route>*/}

	</div>
}