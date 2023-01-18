import { useAppSelector } from './store/hooks';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ApplicationBar } from './components/appBar';
import { Box, Container } from '@mui/material';


export const Template = () => {
	const { id_token } = useAppSelector(x => x.token)
	const navigate = useNavigate();
	useEffect(() => {
		if (!id_token) {
			navigate({
				pathname: '/auth'
			})
		}
	}, [id_token])
	return <div>
		<ApplicationBar/>
		<Container maxWidth="sm" sx={{paddingTop: '50px'}}>
			<Box>
				<Outlet/>
			</Box>
		</Container>

	</div>
}