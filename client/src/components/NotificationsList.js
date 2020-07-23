import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Container,LinearProgress} from '@material-ui/core';
import NotificationCard from './NotificationCard';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(5),
        backgroundColor: theme.palette.background.default,
    }
}));

export default function NotificationsList() {
    const classes = useStyles();
    const [notiData, setNotiData] = useState({notifications:[]});
    const [page, setPage] = useState({pageNumber:0,stopFetching:false});
    const [isFetching, setIsFetching] = useState(false);

    const getMoreNotifications = async () => {
		try {
            if(!page.stopFetching){
                const promise = await axios.get('/notifications',{params:{page:page.pageNumber}});
                setNotiData({notifications:[...notiData.notifications,...promise.data.notifications]});
                const newPage = {pageNumber:page.pageNumber+1,stopFetching:(promise.data.stopFetching===true)};
                setPage(newPage);
                setIsFetching(false);
            }
		} catch (error) {
            setPage({pageNumber:0,stopFetching:true});
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


    return (
        <section className={classes.root}>
            <Container maxWidth="md" component="main">
                <Typography variant="h5"  color="textPrimary" component="p" style={{fontWeight: 'bold'}}>
                Notifications:
                </Typography>
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
                {page.stopFetching? "---------END--------":null}
            </Container>
        </section>
        );
}
