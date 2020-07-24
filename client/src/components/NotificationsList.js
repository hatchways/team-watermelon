import React, {useEffect, useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Container,LinearProgress, Link} from '@material-ui/core';
import NotificationCard from './NotificationCard';
import axios from 'axios';
import AuthContext from '../state_management/AuthContext';



const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(5),
        backgroundColor: theme.palette.background.default,
    }
}));

export default function NotificationsList() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const [notiData, setNotiData] = useState({notifications:[],pageNumber:0,stopFetching:false});
    // const [page, setPage] = useState({pageNumber:0,stopFetching:false});
    const [isFetching, setIsFetching] = useState(false);

    const getMoreNotifications = async () => {
		try {
            if(!notiData.stopFetching){
                const promise = await axios.get('/notifications',
                {params:{
                    page:notiData.pageNumber,
                    receiver:authContext.id
                }});
                setNotiData({
                    notifications:[...notiData.notifications,...promise.data.notifications],
                    pageNumber:notiData.pageNumber+1,
                    stopFetching:(promise.data.stopFetching===true)});
                // const newPage = {pageNumber:page.pageNumber+1,stopFetching:(promise.data.stopFetching===true)};
                // setPage(newPage);
                setIsFetching(false);
            }
		} catch (error) {
            setNotiData({
                notifications:[],
                pageNumber:0,
                stopFetching:false});
            alert('notification loading failed');
		}
	};
    
    useEffect(() => {
        getMoreNotifications();
        window.scrollTo(0, 0);
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        if (isFetching) {
            getMoreNotifications();
        }
        // eslint-disable-next-line
    }, [isFetching]);
    
    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || 
            isFetching) 
            return;
        setIsFetching(true);
    }

    const updateNotifications = async()=>{

        await setNotiData({
            notifications:[],
            pageNumber:0,
            stopFetching:false
        });
        await setIsFetching(false);
        await getMoreNotifications();
    }

    return (
        <section className={classes.root}>
            <Container maxWidth="md" component="main">
                <Typography variant="h5"  color="textPrimary" component="p" style={{fontWeight: 'bold'}}>
                Notifications:
                </Typography>
                <Link onClick={updateNotifications}>
                    update
                </Link>
                <br/>
                <Grid container spacing={1} alignItems="center">
                    {notiData.notifications.map((n) => (
                        <Grid item key={n._id} sm={12}>
                        <NotificationCard 
                            notification={n} 
                        />
                        </Grid>
                    ))}
                </Grid>
                {isFetching?<LinearProgress/>:null}
                {notiData.stopFetching? "---------END--------":null}
            </Container>
        </section>
        );
}
