import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Button, Grid, Tabs, Tab, AppBar } from '@material-ui/core';
import FriendCard from './FriendCard.js';
import AuthContext from '../state_management/AuthContext';

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

	console.log(usersData);
	return (
		<div>
			<Button onClick={() => setDialogOpen(true)} {...props}>
				Follow New Friends
			</Button>
			<Dialog style={style.dialog} open={dialogOpen}>
				<AppBar style={style.appBar} position="static" color="default">
					<Tabs
						value={value}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						onChange={handleChange}
					>
						<Tab label="Suggested" onClick={() => setSuggestedActive(true)}>
							Suggested
						</Tab>
						<Tab label="Following" onClick={() => setSuggestedActive(false)}>
							Following
						</Tab>
					</Tabs>
                </AppBar>
                { usersData ? 
				<Grid container spacing={1} alignItems="center">
					{usersData.map((friend) => (
						<Grid item key={friend._id} xs={12} md={12} lg={12}>
							{FriendCard(friend)}
						</Grid>
					))}
				</Grid>
				<Button fullWidth onClick={() => setDialogOpen(false)} color="primary">
					X
				</Button>
			</Dialog>
		</div>
	);
}
