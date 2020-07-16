import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Box,Container} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import {cutContentLength, covertNumberDecimal} from '../utils/transformText';

const useStyles = makeStyles((theme) => ({
    link: {
        margin: theme.spacing(1, 1.5),
    },
    list:{
        backgroundColor: "#ffffff",
    },
    listItem:{
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
  
  return (
        <div>
            <Container align="center">
                <Box  className={classes.box}>
                    <ArrowDropUpRoundedIcon fontSize="large" className={classes.arrow}/>
                </Box>
            </Container>
            <Divider variant='fullWidth' component="li" className={classes.line} />
            <List className={classes.list}>
                {props.messages.map((product) => (
                    <div key={product._id} className={classes.listItem}>
                        <Typography color="textPrimary" variant="body1">
                            New price!
                        </Typography>
                        <ListItem >
                            <ListItemAvatar>
                            <Avatar alt="no img" src={product.image} variant="square" type="image">
                                P
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography className={classes.title} color="textPrimary" variant="body2">
                                    {cutContentLength(product.name,30,"no product name")}
                                </Typography>
                                <Typography component="a" href={product.url} target="_blank" rel="noreferrer" variant="caption" color="textSecondary">
                                    {cutContentLength(product.url,30,"no link")}
                                </Typography >
                                <Grid container alignItems='baseline'>
                                    <Grid item xs={6}>
                                        <Typography color="textSecondary" style={linethrough} variant="body2">
                                            ${covertNumberDecimal(product.lastprice)}{" "}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="button" color="primary">
                                            ${covertNumberDecimal(product.currentprice)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
            </List>
        </div>
    );
}