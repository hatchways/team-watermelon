import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Button, Grid, Tabs, Tab, AppBar, CircularProgress, Typography } from '@material-ui/core';
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
	const currentUserId = authContext.id;
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

	console.log(authContext.friends_list);
	return (
		<div>
			<Button onClick={() => setDialogOpen(true)} {...props}>
				Friends
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
				{suggestedActive ? (
					usersData ? (
						<Grid container spacing={1} alignItems="center">
							{usersData
								.filter(
									(friend) =>
										friend._id !== currentUserId && !authContext.friends_list.includes(friend._id)
								)
								.map((friend) => (
									<FriendCard
										key={friend._id}
										id={friend._id}
										name={friend.name}
										profile_picture={friend.profile_picture}
									/>
								))}
						</Grid>
					) : (
						<CircularProgress />
					)
				) : usersData && authContext.friends_list.length > 0 ? (
					<Grid container spacing={1} alignItems="center">
						{usersData
							.filter(
								(friend) =>
									friend._id !== currentUserId && authContext.friends_list.includes(friend._id)
							)
							.map((friend) => (
								<FriendCard
									key={friend._id}
									id={friend._id}
									name={friend.name}
									profile_picture={friend.profile_picture}
								/>
							))}
					</Grid>
				) : (
					<Typography>You are not Following anyone yet</Typography>
				)}
				<Button fullWidth onClick={() => setDialogOpen(false)} color="primary">
					X
				</Button>
			</Dialog>
		</div>
	);
}
