import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { SignUp } from './features/auth/signup';
import { Auth } from './features/auth';
import { SignIn } from './features/auth/signIn';
import { Template } from './template/template';
import { NewTransaction } from './features/newTransaction';
import { TransactionsList } from './features/transactionsList';

function App() {
	return (
		<div className="min-h-screen">
			<Routes>
				<Route path="/" element={<Template/>}>
					<Route path="newTransaction" element={<NewTransaction/>}></Route>
					<Route path="transactions" element={<TransactionsList/>}></Route>
					<Route
						path=""
						element={<Navigate to="newTransaction" />}
					/>
					<Route
						path="*"
						element={<Navigate to="newTransaction" />}
					/>
				</Route>
				<Route
					path="*"
					element={<Navigate to="/" />}
				>

				</Route>
				<Route path="/auth" element={<Auth/>}>
					<Route
						path=""
						element={<Navigate to="signup" />}
					/>
					<Route path="signup" element={<SignUp/>}></Route>
					<Route path="signin" element={<SignIn/>}></Route>
					<Route
						path="*"
						element={<Navigate to="signup" />}
					/>
				</Route>

			</Routes>
		</div>
	);
}

export default App;
