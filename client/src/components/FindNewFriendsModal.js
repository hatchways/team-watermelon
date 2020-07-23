import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Button, Grid, Tabs, Tab, AppBar, CircularProgress, Typography, Container } from '@material-ui/core';
import AuthContext from '../state_management/AuthContext';
import SuggestedFriends from './SuggestedFriends.js';
import Following from './Following.js';

const style = {
	error: {
		color: 'red'
	},
	dialog: {
		padding: '10px 40px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	appBar: {
		marginBottom: '30px'
	},
	formStyle: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: '30px',
		width: '100%'
	},
	hidden: {
		visibility: 'hidden'
	},
	textField: {
		width: '70%'
	},
	xButton: {
		width: '20%'
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'center',
		padding: '10px 0px'
	}
};

export default function FindNewFriendsModal(props) {
	const authContext = useContext(AuthContext);
	const [usersData, setUsersData] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [suggestedActive, setSuggestedActive] = useState(true);
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const getUsers = async () => {
		try {
			const res = await axios.get('/users/allUsers');
			await setUsersData(res.data);
		} catch (error) {
			console.log('Error getting users');
		}
	};
	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div>
			<Button onClick={() => setDialogOpen(true)}>Friends</Button>
			<Dialog style={style.dialog} open={dialogOpen}>
				<AppBar style={style.appBar} position="static" color="default">
					<Tabs
						value={value}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						onChange={handleChange}
					>
						<Tab label="Suggested" onClick={() => setSuggestedActive(true)} />
						<Tab label="Following" onClick={() => setSuggestedActive(false)} />
					</Tabs>
				</AppBar>
				{suggestedActive ? (
					usersData ? (
						<Grid container spacing={1} alignItems="center">
							<SuggestedFriends usersData={usersData} />
						</Grid>
					) : (
						<CircularProgress />
					)
				) : usersData && authContext.friends_list.length > 0 ? (
					<Grid container spacing={1} alignItems="center">
						<Following usersData={usersData} />
					</Grid>
				) : (
					<Typography>You are not Following anyone yet</Typography>
				)}
				<Container style={style.buttonContainer}>
					<Button
						style={style.xButton}
						onClick={() => setDialogOpen(false)}
						color="primary"
						variant="contained"
					>
						Close X
					</Button>
				</Container>
			</Dialog>
		</div>
	);
}
