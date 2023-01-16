import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Signin } from './features/signin';

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Signin/>}></Route>
			</Routes>
		</div>
	);
}

export default App;
