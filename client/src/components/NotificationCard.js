import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, 
    Grid, 
    Card, 
    CardActionArea, 
    CardContent, 
    Container,
    Avatar,
    Chip,
    Box
} from '@material-ui/core';
import {cutContentLength, convertNumberDecimal,getTimeAgo} from '../utils/transformText';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import axios from 'axios';

const linethrough= {
    "textDecoration": "line-through",
}

const useStyles = makeStyles((theme)=>({
    card: {
        display: 'flex',
        minWidth: '400px',
    },
    description: {
        display:"flex",
        width:"95%",
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        margin:'2px'
    },
    cardContent: {
        paddingTop:'2px',
        paddingBottom:'2px',
        width:'100%'
    },
    forProduct:{
        display: 'flex',
    },
    notProduct:{
        display:'none'
    },
    badgeContainer:{
        padding:'3px',
        '& > *': {
            margin: theme.spacing(0.5)
          },
    },
    today:{
        backgroundColor:"#4287f5",
        color:'white'
    },
    yellow:{
        backgroundColor:'#ffc400',
        color:'black'
    },
    green:{
        backgroundColor:'#00a152',
        color:'white'
    }
}));


export default function NotiCard(props) {
    const classes = useStyles();
    const [noti, setNoti] = useState(props.notification);
    const [someTimeAgo,hours] = getTimeAgo(noti.createdAt);


    const setNotificationRead= async()=>{
        if (!noti.content.isRead){
            try {
                await axios.put(`/notifications/read/${props.notification._id}`);
                setNoti({...noti,content:{...noti.content,isRead:true}});
            } catch (error) {
                console.log('notification can not be updated');
            }
        }
    }

    useEffect(()=>{
        if(!noti.content.isRead){
            setTimeout(() => {
                setNotificationRead();
            }, 4000);
        }
        // eslint-disable-next-line
    },[]);

    const getBadgeByType=(type)=>{
        switch(type){
            case 'new price':
            case 'new_price':
            case 'New Price':
                return(
                <Chip
                    size='small'
                    icon={<LocalOfferIcon />}
                    label={type}
                    color="secondary"
                />)
            case 'New Follower!':
                return(
                    <Chip
                        size='small'
                        icon={<FavoriteIcon style={{ color:'white' }}/>}
                        label={type}
                        className={classes.yellow}
                    />)
            default:
                return(
                    <Chip
                        size='small'
                        icon={<NewReleasesIcon style={{ color:'white' }}/>}
                        label={type}
                        className={classes.green}
                    />)
        }
            
    }

    return (

        <Card className={classes.card}>
            <CardActionArea component="a" href={noti.content.url} target="_blank" rel="noreferrer">
                <Container className={classes.badgeContainer}>
                {getBadgeByType(noti.notificationType)}
                {hours < 24?<Chip label="Within 24 h!!" className={classes.today} size='small'/>:null}
                {noti.content.isRead?<Chip label="Read" size='small'/>:<Chip label="New!" color="primary" size='small'/>}
                </Container>
                <Grid container>
                    <Grid item sm={12} md={2}>
                        <Box align='center'>
                        <Avatar src={noti.content.image} variant="square" type="image" className={classes.avatar}>
                            {noti.content.title?noti.content.title.slice(0,1):'P'}
                        </Avatar>
                        </Box>
                    </Grid>
                    <Grid item sm={12} md={10}>
                        <CardContent className={classes.cardContent}>
                            <Grid container>
                                <Grid item sm={12} md={9}>
                                    <Typography variant="subtitle2">
                                        {cutContentLength(noti.content.title,40,"no title")}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} md={3} >
                                    <Typography color="textSecondary" variant="body2">
                                        {someTimeAgo}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="body2" className={classes.description}>
                                {noti.content.description?cutContentLength(noti.content.description,100,"no description"):null}
                            </Typography>
                            {noti.content.lastprice && noti.content.currentprice?
                            <Grid 
                                container 
                                className={(noti.notificationType==='new price'||noti.notificationType==='new_price')?classes.forProduct:classes.notProduct}
                                direction='row'>
                                <Grid item sm={12} md={6}>
                                    <Typography color="textSecondary" style={linethrough} variant="body2">
                                    Price: $ {convertNumberDecimal(noti.content.lastprice)}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <Typography color="primary" variant="body2">
                                    New Price: $ {convertNumberDecimal(noti.content.currentprice)}
                                    </Typography>
                                </Grid>
                            </Grid>:null}
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    );
}

NotiCard.propTypes = {
    notification: PropTypes.object,
};