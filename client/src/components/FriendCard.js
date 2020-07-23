import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Avatar, Box, Button, CardActions, CardActionArea } from '@material-ui/core';
import AuthContext from '../state_management/AuthContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex'
	},
	cardDetails: {
		display: 'flex',
		width: '100%',
		zIndex: 1
	},
	cardMedia: {
		width: 160
	},
	cardContent: {
		width: '100%',
		marginTop: theme.spacing(2)
	},
	large: {
		width: theme.spacing(8),
		height: theme.spacing(8),
		margin: theme.spacing(1),
		zIndex: 1,
		alignItems: 'left'
	},
	box: {
		zIndex: 0,
		backgroundColor: '#FF7F50',
		opacity: 0.4
	}
}));

export default function FriendCard(props) {
	const classes = useStyles();
	const authContext = useContext(AuthContext);

	const followUser = async (id) => {
		try {
			const res = await axios.post(`/users/follow/${id}`);
			authContext.handleFollow(id);
			return res;
		} catch (error) {
			console.log('error following user');
		}
	};
	const unfollowUser = async (id) => {
		try {
			const res = await axios.post(`/users/unfollow/${id}`);
			authContext.handleUnfollow(id);
			return res;
		} catch (error) {
			console.log('error unfollowing user');
		}
	};
	return (
		<CardActionArea>
			<Box position="relative" left="0px">
				<Card className={classes.card}>
					<Box
						width="100%"
						height="28%"
						className={classes.box}
						position="absolute"
						left="0%"
						borderRadius="borderRadius"
					/>
					<Box position="relative" left="0%" alignItems="left">
						<Avatar alt={props.name} src={props.profile_picture} className={classes.large} />
					</Box>
					<div className={classes.cardDetails}>
						<CardContent className={classes.cardContent}>
							<Typography component="h2">{props.name}</Typography>
						</CardContent>
						<CardActions>
							{authContext.friends_list.includes(props.id) ? (
								<Button
									onClick={() => unfollowUser(props.id)}
									variant="outlined"
									color="primary"
									href="#"
									size="small"
								>
									Unfollow
								</Button>
							) : (
								<Button
									onClick={() => followUser(props.id)}
									variant="outlined"
									color="primary"
									href="#"
									size="small"
								>
									Follow
								</Button>
							)}
						</CardActions>
					</div>
				</Card>
			</Box>
		</CardActionArea>
	);
}
