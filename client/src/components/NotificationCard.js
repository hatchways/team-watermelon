import React from 'react';
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

const linethrough= {
    "textDecoration": "line-through",
}

const useStyles = makeStyles((theme)=>({
    card: {
        display: 'flex',
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
        paddingTop:'5px',
        paddingBottom:'5px',
    },
    forProduct:{
        display: 'flex',
    },
    notProduct:{
        display:'none'
    },
    badgeContainer:{
        padding:'5px',
    }
}));


export default function NotiCard(props) {
    const classes = useStyles();
    const noti = props.notification;

    return (

        <Card className={classes.card} >
            <CardActionArea component="a" href={noti.content.url} target="_blank" rel="noreferrer">
                <Container className={classes.badgeContainer}>
                <Chip
                    size='small'
                    icon={<LocalOfferIcon />}
                    label={noti.notificationType}
                    color="secondary"
                />
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
                            <Grid container description='row'>
                                <Grid item sm={12} md={9}>
                                    <Typography variant="subtitle2">
                                        {cutContentLength(noti.content.title,40,"no title")}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} md={3} >
                                    <Typography color="textSecondary" variant="body2">
                                        {getTimeAgo(noti.createdAt)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="body2" className={classes.description}>
                                {cutContentLength(noti.content.description,100,"no description")}
                            </Typography>
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
                            </Grid>
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