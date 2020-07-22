import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Container, CircularProgress } from '@material-ui/core';
import ListCard from './ListCard';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import AuthContext from '../state_management/AuthContext';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1)
	},
	TopContent: {
		padding: theme.spacing(8, 0, 10)
	}
}));

const FriendsShoppingLists = () => {
	const classes = useStyles();
	const authContext = useContext(AuthContext);
	const [friendsLists, setFriendsLists] = useState([]);

	const getFriendsList = async (friendId) => {
		try {
			const res = await axios.get(`/lists/${friendId}`);
			await setFriendsLists(...friendsLists, res.data.lists);
		} catch (error) {
			console.log("error getting friend's list");
		}
	};
	const getAllFriendsLists = () => {
		authContext.friends_list.map((item) => getFriendsList(item));
	};
	useEffect(() => {
		getAllFriendsLists();
	}, []);
	console.log(friendsLists);
	return (
		<section className={classes.root}>
			<Container maxWidth="md" component="main">
				<Typography variant="h5" align="left" color="textSecondary" component="p">
					Friends Shopping Lists:
				</Typography>
				<br />

				<Grid container spacing={5}>
					{friendsLists ? (
						friendsLists.map((list) => (
							<Grid item key={list._id} xs={12} sm={6} md={4}>
								<ListCard list={list} />
							</Grid>
						))
					) : (
						<CircularProgress />
					)}
				</Grid>
			</Container>
		</section>
	);
};

export default FriendsShoppingLists;
// {shListsContext.lists.map((list) => (
// 	<Grid item key={list._id} xs={12} sm={6} md={4}>
// 		<ListCard list={list} />
// 	</Grid>
// ))}
