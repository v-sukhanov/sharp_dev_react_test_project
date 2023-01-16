import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SignUp } from './features/auth/signup';
import { Auth } from './features/auth';
import { SignIn } from './features/auth/signIn';

function App() {
	return (
		<div className="bg-blue-100 min-h-screen">
			<Routes>
				<Route path="/auth" element={<Auth/>}>
					<Route path="signup" element={<SignUp/>}></Route>
					<Route path="signin" element={<SignIn/>}></Route>
				</Route>

			</Routes>
		</div>
	);
}

export default App;
