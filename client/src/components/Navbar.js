import React,{useContext, useEffect, useState} from 'react';
import {Toolbar, AppBar, Box, Typography, Link, IconButton, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AuthContext from '../state_management/AuthContext';
import {fetchShLists} from '../state_management/actionCreators/shoppingListsActs';
import ShListsContext from '../state_management/ShListsContext';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001";

const useStyles = makeStyles((theme) => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    margin:{
        margin: theme.spacing(1),
    }
  }));

let needsFetchingLists = true;

const Navbar = ()=>{
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const shListsContext = useContext(ShListsContext);
    const [notification, setNotification] = useState({socket:null, message:""});


    useEffect(() => {
        if(authContext.isAuthenticated && needsFetchingLists){ //pretects, because private route is uncommented for developing
            fetchShLists(shListsContext.dispatchShLists,shListsContext.handleShListsFailure);
            needsFetchingLists = false;
            console.log("Navbar/useEffet is fetching");
        }
        if(authContext.isAuthenticated){
            const socket = socketIOClient(ENDPOINT);
            setNotification({socket:socket,message:""});

            socket.on('show_notification', data => {
            console.log("test 1");
                console.log(data.title,data.message);
            });
            socket.emit('join_room', {
                message: "",
                userId: authContext._id,
                title: "join room",
            });
            console.log("Navbar/useEffect socket");
            
        }
    },[authContext.isAuthenticated]);

    const leaveSocketRoom=()=>{
        notification.socket.emit('leave_room', {
            message: "",
            userId: authContext._id,
            title: "leave room",
        });
    }

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
                <Link variant="button" 
                    component={RouterLink} 
                    to="/main"
                    color="textPrimary" 
                    className={classes.link}>
                    Shopping Lists
                </Link>
                <Link component={RouterLink}
                    to="/friendslist" 
                    variant="button" 
                    color="textPrimary" 
                    className={classes.link}>
                    Friends
                </Link>
                <Link component={RouterLink}
                    to="#" 
                    variant="button" 
                    color="textPrimary" 
                    className={classes.link}>
                    Notifications
                </Link>
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
    )


}


export default Navbar;