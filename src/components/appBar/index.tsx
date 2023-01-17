import {
	AppBar,
	Avatar,
	Box, Button,
	Container,
	IconButton, Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography
} from '@mui/material';
import React from 'react';
import { useActions } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { useUserInfoQuery } from '../../store/protected.api';
import { Menu as MenuIcon } from '@mui/icons-material';

const pages = [
	{
		title: 'transactions',
		link: '/transactions'
	},
	{
		title: 'new transaction',
		link: '/newTransaction'
	}];
const settings = ['logout']

export const ApplicationBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event: any) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: any) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleNav= (nav: { title: string, link: string }) => {
		navigate(nav.link)
		handleCloseNavMenu();
	}

	const handleSelectUserMenu = (menu: string) => {
		if (menu === 'logout') {
			logout();
		}
		handleCloseUserMenu();
	}

	const { data: userInfo } = useUserInfoQuery()
	const { removeToken } = useActions();
	const navigate = useNavigate();


	const logout = () => {
		removeToken();
		navigate({
			pathname: '/auth/signin'
		})
	}


	return <AppBar position="static">
		<Container maxWidth="xl">
			<Toolbar disableGutters>
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontWeight: 700,
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					Internal money
				</Typography>

				<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleOpenNavMenu}
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: 'block', md: 'none' },
						}}
					>
						{pages.map((page) => (
							<MenuItem key={page.link} onClick={() => handleNav(page)}>
								<Typography textAlign="center">{page.title}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
				<Typography
					variant="h5"
					noWrap
					component="a"
					href=""
					sx={{
						mr: 2,
						display: { xs: 'flex', md: 'none' },
						flexGrow: 1,
						fontWeight: 700,
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					Internal money
				</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
					{pages.map((page) => (
						<Button
							key={page.link}
							onClick={() => handleNav(page)}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							{page.title}
						</Button>
					))}
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'center'}}>
					<Typography sx={{marginRight: '5px', opacity: .8}}>
						Balance:
					</Typography>
					<Typography sx={{marginRight: '25px', fontWeight: 'bold'}}>
						{userInfo?.balance} PW
					</Typography>
					<Box onClick={handleOpenUserMenu}  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
						<Tooltip title="Open settings">
							<IconButton sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp"/>
							</IconButton>
						</Tooltip>
						<Typography sx={{marginLeft: '10px'}}>
							{userInfo?.name}
						</Typography>
					</Box>

					<Menu
						sx={{ mt: '45px' }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						{settings.map((setting) => (
							<MenuItem key={setting} onClick={() => handleSelectUserMenu(setting)}>
								<Typography textAlign="center">{setting}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
			</Toolbar>
		</Container>
	</AppBar>

}