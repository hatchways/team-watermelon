import React,{useContext} from 'react';
import {Toolbar, AppBar, Box, Typography, Link, IconButton, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AuthContext from '../state_management/AuthContext';

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



const Navbar = ()=>{
    const classes = useStyles();
    const authContext = useContext(AuthContext);

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
                <Typography variant="body1" color="inherit">
                Welcome! {authContext.name}
                </Typography>:""
            }
            
            <Link variant="button" 
                component={RouterLink} 
                to="/main"
                color="textPrimary" 
                className={classes.link}>
                Shopping Lists
            </Link>
            <Link component={RouterLink}
                to="#" 
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
            {authContext.isAuthenticated?
                <Button onClick={()=>authContext.handleLogout({})} 
                    color="primary" 
                    variant="outlined" 
                    className={classes.link}
                    >
                    Logout
                </Button>: ""
            }
            </Toolbar>
        </AppBar>
    )


}


export default Navbar;