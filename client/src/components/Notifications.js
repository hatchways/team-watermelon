import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Box,Container,Link} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import {cutContentLength, convertNumberDecimal} from '../utils/transformText';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    link: {
        margin: theme.spacing(1, 1.5),
    },
    list:{
        backgroundColor: "#ffffff",
    },
    listItem:{
        minWidth:"200px",
        align:'center',
        padding: '6px',
    },
    line:{
        height: "2px",
        borderBottom: "solid black",
        zIndex:3,
    },
    arrow:{
        position: "absolute",
        zIndex:2,
        color:"#000000",
    },
    box:{
        height:"15px",
    }

}));

const linethrough= {
    "textDecoration": "line-through",
}

export default function NotificationsPopper(props) {
    const classes = useStyles();

    const cutProductName=(name)=>{
        try{
            return name.slice(0,1)
        }catch{
            return "P"
        }
    }
  
    return (
        <div>
            <Container align="center">
                <Box  className={classes.box}>
                    <ArrowDropUpRoundedIcon fontSize="large" className={classes.arrow}/>
                </Box>
            </Container>
            <Divider variant='fullWidth' component="li" className={classes.line} />
            <List className={classes.list}>
                {props.messages.reverse().map((m) => (
                    <div key={m.id} className={classes.listItem} >
                        <Typography color="textPrimary" variant="subtitle2">
                            {m.type}
                        </Typography>
                        <ListItem component="a" href={m.content.url} target="_blank" rel="noreferrer">
                            <ListItemAvatar>
                            <Avatar src={m.content.image} variant="square" type="image">
                                {cutProductName(m.content.title)}
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography className={classes.title} color="textPrimary" variant="subtitle2">
                                    {cutContentLength(m.content.title,30,"no product title")}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {cutContentLength(m.content.url,30,"no link")}
                                </Typography >
                                <Grid container alignItems='baseline'>
                                    <Grid item xs={6}>
                                        <Typography color="textSecondary" style={linethrough} variant="body2">
                                            ${convertNumberDecimal(m.content.lastprice)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="button" color="primary">
                                            ${convertNumberDecimal(m.content.currentprice)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
                <div className={classes.listItem}>
                    <Box textAlign="center" align="center">
                        <Link component={RouterLink} to="/main" color="textPrimary" variant="subtitle1" >
                            see all
                        </Link>
                    </Box>
                </div>
            </List>
        </div>
    );
}