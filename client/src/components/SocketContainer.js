import React, { useState, useContext, useEffect } from 'react';
import {Button, Badge, Popper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../state_management/AuthContext';
import socketIOClient from "socket.io-client";
import Notifications from "./Notifications";
import {ENDPOINT} from '../utils/baseUrl';


const useStyles = makeStyles((theme) => ({
	link: {
		margin: theme.spacing(1, 1.5)
	},
	popper:{
		zIndex:1200
	}
}));

let msgHasBeenRead = false;
let needsSetSocket = true;


const SocketContainer = ()=>{
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const [notification, setNotification] = useState({messages:[]});
    const [newMsg, setNewMsg] = useState(null);
    const [socket, setSocket] = useState({socket:null});
	const [anchorEl, setAnchorEl] = useState(null);


    useEffect(() => {
        if(authContext.isAuthenticated && needsSetSocket){
            const socketIo = socketIOClient(ENDPOINT);
            needsSetSocket = false;

            socketIo.on('show_notification', data => {
                setNewMsg(data);
                msgHasBeenRead = false;
            });
            socketIo.emit('join_room', {
                userId: authContext.id,
            });
            setSocket({socket:socketIo});
        }
        if(!authContext.isAuthenticated && socket.socket){
            leaveSocketRoom();
        }
        if(newMsg){
			const tmp = [...notification.messages,newMsg].slice(-5);
            setNotification({ messages:tmp });
            setNewMsg(null);
		}
		// eslint-disable-next-line
    },[authContext.isAuthenticated, authContext.id, newMsg, notification.messages]);

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

    const handleClickOnNotification = (event) => {
		if(msgHasBeenRead===true){
            setNotification({ messages:[] });      
        }else{
            msgHasBeenRead = true;
		}
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };


	return (
        <Badge badgeContent={notification.messages.length} color="secondary" overlap="circle">
        <Button 
            aria-describedby='simple-popper'
            onClick={handleClickOnNotification}
            className={classes.link}>
            Notifications
            </Button>
            <Popper 
                id='simple-popper' 
                open={Boolean(anchorEl)} 
                anchorEl={anchorEl} 
                className={classes.popper}>
                <Notifications messages={notification.messages}/>
            </Popper>
        </Badge>
	);
};

export default SocketContainer;