import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Grid,
  Button,
  Container,
  Box,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

const CustomTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '0',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    btn: {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      borderRadius: '30px',
      marginLeft: '20px'
    },
    text: {
        width: '350px',
    },
    box:{
      backgroundColor: '#fbfcff',
    },
    bar: {
        display: "flex",
        flexWrap: "nowrap"
    },
    buttonProgress: {
      color: '#DF1B1B',
      position: 'absolute',
      top: '2%',
      left: '35%',
    }
}));

export default function BasicTextFields(props) {
    const classes = useStyles();
    const [allUsers, setAllUsers] = useState([]);
    const [searchUser, setSearchUser] = useState('');

    const getAllUsers = async () => {
        try {
            const res = await axios.get('/users/allUsers');
            await setAllUsers(res.data);
        } catch (error) {
            console.log('Error getting users');
        }
    };
  
    useEffect(() => {
        getAllUsers();
    }, []);

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <Container align="center" maxWidth="md" >
            <Box width="sm" height="sm" className={classes.box} borderRadius={50} flexGrow={1}>
                <Container>
            <Grid container spacing={1} direction="row" alignItems="center" align="center" className={classes.bar}>
                <Grid item xs={12} md={8}>
                <Autocomplete
                    id="combo-box-demo"
                    options={allUsers}
                    getOptionLabel={(user) => user.name}
                    onChange={(event, value) => setSearchUser(value)}
                    style={{ width: 200 }}
                    renderInput={(params) => 
                        <CustomTextField
                            { ...params }
                            fullWidth
                            placeholder="Search user"
                            variant="outlined" 
                        />}
                />
                </Grid>
                <Grid item xs={2} md={4}>
                    <Button 
                        color="primary"
                        variant="contained" 
                        size="large"
                        fullWidth
                        aria-label="search" 
                        component={RouterLink}
                        to={searchUser ? `/users/${searchUser.name}` : ``}
                        className={classes.btn}
                        disableElevation>
                        <SearchIcon/>
                    </Button>
                </Grid>
            </Grid>
            </Container>
            </Box>
            </Container>
    </form>
  );
}