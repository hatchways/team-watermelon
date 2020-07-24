import React, { useState, useContext, useEffect } from 'react';
import PhotoUpload from './PhotoUpload.js';
import {
	Toolbar,
	AppBar,
	Box,
	Typography,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
	Badge,
	Popper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AuthContext from '../state_management/AuthContext';
import { fetchShLists } from '../state_management/actionCreators/shoppingListsActs';
import ShListsContext from '../state_management/ShListsContext';
import FindNewFriendsModal from '../components/FindNewFriendsModal.js';
import socketIOClient from "socket.io-client";
import Notifications from "./Notifications";
import {ENDPOINT} from '../utils/baseUrl';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
	appBar: {
		backgroundColor: 'white',
		position: 'sticky',
		color: theme.palette.primary.main
	},
	toolbar: {
		flexWrap: 'wrap'
	},
	toolbarTitle: {
		flexGrow: 1
	},
	link: {
		margin: theme.spacing(1, 1.5)
	},
	margin: {
		margin: theme.spacing(1)
	},
	popper: {
		zIndex: 1200
	}
}));

let needsFetchingLists = true;
let msgHasBeenRead = false;
let needsSetSocket = true;

const Navbar = (props) => {
	const classes = useStyles();
	const authContext = useContext(AuthContext);
	const shListsContext = useContext(ShListsContext);
	const [notification, setNotification] = useState({ messages: [] });
	const [newMsg, setNewMsg] = useState(null);
	const [socket, setSocket] = useState({ socket: null });
	const [anchorEl, setAnchorEl] = useState(null);
	const [anchorMenu, setAnchorMenu] = useState(null);
	const [profilePage, setProfilePage] = useState(false);

	const handleMenuClick = (event) => {
		setAnchorMenu(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorMenu(null);
	};

	useEffect(() => {
		if (authContext.isAuthenticated && needsFetchingLists) {
			fetchShLists(shListsContext.dispatchShLists, shListsContext.handleShListsFailure);
			needsFetchingLists = false;
			props.history.push('/main');
		}

		if (authContext.isAuthenticated && needsSetSocket) {
			const socket = socketIOClient(ENDPOINT);
			needsSetSocket = false;

			socket.on('show_notification', (data) => {
				setNewMsg(data);
				msgHasBeenRead = false;
			});
			socket.emit('join_room', {
				userId: authContext.id
			});
			setSocket({ socket: socket });
		}
		if (newMsg) {
			const tmp = [...notification.messages, newMsg].slice(-5);
			setNotification({ messages: tmp });
			setNewMsg(null);
		}
		if(profilePage) {
			setProfilePage(false);
			props.history.push("/profile");
		}
		// eslint-disable-next-line
	}, [
		authContext.isAuthenticated,
		authContext.id,
		newMsg,
		shListsContext.dispatchShLists,
		shListsContext.handleShListsFailure,
		notification.messages
	]);

	const leaveSocketRoom = () => {
		if (socket.socket) {
			socket.socket.emit('leave_room', {
				userId: authContext.id
			});
		}
		socket.socket.close();
		setNotification({ messages: [] });
		needsSetSocket = true;
	};
	const handleClickOnNotification = (event) => {
		if (msgHasBeenRead === true) {
			setNotification({ messages: [] });
		} else {
			msgHasBeenRead = true;
		}
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	return (
		<AppBar color="primary" elevation={0} className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					component={RouterLink}
					to="/home"
					color="primary"
					aria-label="home"
					className={classes.margin}
				>
					<LocalMallIcon fontSize="large" />
				</IconButton>
				<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
					<Box letterSpacing={4} m={1}>
						BigDeal
					</Box>
				</Typography>
				<SearchBar/>
				{authContext.isAuthenticated ? (
					<>
						<Button
							component={RouterLink}
							to="/main"
							className={classes.link}
						>
							My Shopping Lists
						</Button>
						<FindNewFriendsModal />
						<Badge badgeContent={notification.messages.length} color="secondary" overlap="circle">
							<Button aria-describedby={id} onClick={handleClickOnNotification} className={classes.link}>
								Notifications
							</Button>
							<Popper id={id} open={open} anchorEl={anchorEl} className={classes.popper}>
								<Notifications messages={notification.messages} />
							</Popper>
						</Badge>
						<IconButton aria-controls="profile-menu" aria-haspopup="true" onClick={handleMenuClick}>
							<Avatar src={authContext.profile_picture}>{authContext.name.substring(0, 1)}</Avatar>
						</IconButton>
						<Menu
        					id="simple-menu"
        					anchorEl={anchorMenu}
        					keepMounted
        					open={Boolean(anchorMenu)}
        					onClose={handleMenuClose}
      					>
							<MenuItem className={classes.link} onClick={() => {
								setProfilePage(true);
								needsFetchingLists = true;
								handleMenuClose();
							}}>
								<Typography variant="body1" color="inherit">
									{authContext.name}
								</Typography>
							</MenuItem>
							<MenuItem className={classes.link}>
								<PhotoUpload />
							</MenuItem>
							<MenuItem
								className={classes.link}
								style={{ color: '#DF1B1B' }}
								onClick={() => {
									authContext.handleLogout({});
									shListsContext.handleShListsFailure({ response: null });
									leaveSocketRoom();
									needsFetchingLists = true;
									handleMenuClose();
								}}
							>
								LOGOUT
							</MenuItem>
						</Menu>
					</>
				) : null}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
