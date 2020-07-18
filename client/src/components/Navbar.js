import React,{useContext, useEffect, useState} from 'react';
import PhotoUpload from './PhotoUpload.js';
import {Toolbar, AppBar, Box, Typography, Link, IconButton, Button,Badge, Popper} from '@material-ui/core';
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


const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`
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
	}
}));

let needsFetchingLists = true;
let msgHasBeenRead = false;
let needsSetSocket = true;


const Navbar = ()=>{
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const shListsContext = useContext(ShListsContext);
    const [notification, setNotification] = useState({messages:[]});
    const [newMsg, setNewMsg] = useState(null);
    const [socket, setSocket] = useState({socket:null})

    useEffect(() => {
        if(authContext.isAuthenticated && needsFetchingLists){ 
            fetchShLists(shListsContext.dispatchShLists,shListsContext.handleShListsFailure);
            needsFetchingLists = false;
        }
        if(authContext.isAuthenticated && needsSetSocket){
            const socket = socketIOClient(ENDPOINT);
            needsSetSocket = false;

            socket.on('price_notification', data => {
                setNewMsg(data.message);
                msgHasBeenRead = false;
            });
            socket.emit('join_room', {
                userId: authContext.id,
            });
            setSocket({socket:socket});
        }
        if(newMsg){
            setNotification({ messages:[...notification.messages,newMsg] });
            setNewMsg(null);
        }
    },[authContext.isAuthenticated, authContext.id, newMsg, shListsContext.dispatchShLists, shListsContext.handleShListsFailure, notification.messages]);

    const leaveSocketRoom=()=>{
        if(socket.socket){
            socket.socket.emit('leave_room', {
                userId: authContext.id,
            });
        }
        socket.socket.close();
        setNotification({ messages:[] });
        needsSetSocket = true;
    }

    
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClickOnNotification = (event) => {
        if(notification.messages.length > 0){
            setAnchorEl(anchorEl ? null : event.currentTarget);
        }
        if(msgHasBeenRead===true){
            setNotification({ messages:[] });      
        }else{
            msgHasBeenRead = true;
        }
        
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    return(
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
            <IconButton component={RouterLink}
                to="/home" 
                color="primary" 
                aria-label="home" 
                className={classes.margin}>
                <LocalMallIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                <Box letterSpacing={4} m={1}>
                    BigDeal 
                </Box>
            </Typography>
            {authContext.isAuthenticated?
            <>
                <Typography variant="body1" color="inherit">
                Welcome! {authContext.name}
                </Typography>
                <PhotoUpload />
                <Link variant="button" 
                    component={RouterLink} 
                    to="/main"
                    color="textPrimary" 
                    className={classes.link}>
                    Shopping Lists
                </Link>
                <FindNewFriendsModal />
                <Badge badgeContent={notification.messages.length} color="secondary" overlap="circle">
                    <Link 
                    component="button"
                    aria-describedby={id}
                    type="button"
                    onClick={handleClickOnNotification}
                    variant="button" 
                    color="textPrimary" 
                    className={classes.link}>
                    Notifications
                    </Link>
                    <Popper id={id} open={open} anchorEl={anchorEl} >
                        <Notifications messages={notification.messages}/>
                    </Popper>
                </Badge>
                <Button 
                    onClick={()=>{
                        authContext.handleLogout({});
                        shListsContext.handleShListsFailure({response:null});
                        leaveSocketRoom();
                        needsFetchingLists = true;
                    }} 
                    color="primary" 
                    variant="outlined" 
                    className={classes.link}
                    >
                    Logout
                </Button>
            </>:null
            }  
            </Toolbar>
        </AppBar>
	);
};



export default Navbar;
