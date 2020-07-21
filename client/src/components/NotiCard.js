import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, 
    Grid, 
    Card, 
    CardActionArea, 
    CardContent, 
    CardMedia,
    Container,
    Avatar
} from '@material-ui/core';
import {cutContentLength, convertNumberDecimal,getTimeAgo} from '../utils/transformText';

const linethrough= {
    "textDecoration": "line-through",
}

const useStyles = makeStyles((theme)=>({
    card: {
        display: 'flex',
        maxHeight:"120px",
        width:'100%',
    },
    description: {
        display:"flex",
        width:"95%",
    },
    cardMedia: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        padding:theme.spacing(2)
    },
    cardContent: {
        width:"100%",
    },
    forProduct:{

    },
    notProduct:{
        display:'none'
    },
    imageContainer:{
        padding:theme.spacing(1)
    }
}));

const noti ={
    noti_type:'new price',
    createdAt:"2020-07-20T03:03:44.143Z",
    content:{
        image:"https://images-na.ssl-images-amazon.com/images/I/81AfaumtOjL._AC_SY355_.jpg",
        currentprice: {$numberDecimal: "23.46"},
        description: "tempDesc",
        isRead: true,
        lastprice: {$numberDecimal: "0"},
        product_id: "5f0c1a0296c35eda717b7223",
        title: "tempProduct",
        url: "https://source.unsplash.com/5-o5Xe_IwcQ/640x437"
    }

}

export default function NotiCard(props) {
    const classes = useStyles();
    // const noti = props.notification;
    const addDefaultImg=(ev)=>{
        ev.target.src = 'https://source.unsplash.com/8ca1no8JQ1w/640x426';
    }
    return (

            <Card className={classes.card} >
                <Container className={classes.imageContainer}>
                <Avatar src={noti.content.image} variant="square" type="image" className={classes.cardMedia} />
                {/* <CardMedia 
                    component="img"
                    className={classes.cardMedia} 
                    onError={addDefaultImg}
                    src={noti.content.image} 
                    alt={noti.content.title}/> */}
                </Container>
                <CardActionArea component="a" href={noti.content.url} target="_blank" rel="noreferrer">
                    <CardContent className={classes.cardContent}>
                        <Grid container description='row'>
                            <Grid item sm={12} md={6}>
                        <Typography variant="h6">
                            {cutContentLength(noti.content.title,40,"no title")}
                        </Typography>
                        </Grid>
                            <Grid item sm={12} md={6}>
                        <Typography color="textSecondary">
                                {getTimeAgo(noti.createdAt)}
                            </Typography>
                            </Grid>
                            </Grid>
                        <Typography variant="subtitle2" paragraph className={classes.description}>
                            {cutContentLength(noti.content.description,100,"no description")}
                        </Typography>
                            <Grid 
                                container 
                                className={(noti.noti_type==='new price'||noti.noti_type==='new_price')?classes.forProduct:classes.notProduct}
                                direction='row'>
                            <Grid item sm={12} md={6}>
                                <Typography color="textSecondary" style={linethrough}>
                                Price: $ {convertNumberDecimal(noti.content.lastprice)}
                                </Typography>
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <Typography color="primary">
                                New Price: $ {convertNumberDecimal(noti.content.currentprice)}
                                </Typography>
                            </Grid>
                            </Grid>
                    </CardContent>
                </CardActionArea>
                </Card>
    );
}

NotiCard.propTypes = {
    notification: PropTypes.object,
};