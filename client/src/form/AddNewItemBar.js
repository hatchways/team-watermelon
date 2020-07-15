import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {
  TextField,
  Grid,
  IconButton,
  Container,
  Box,
} from '@material-ui/core';
import ShListsContext from '../state_management/ShListsContext';
import {addNewProduct} from "../state_management/actionCreators/productActs";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    link: {
        margin: theme.spacing(1),
    },
    text: {
        margin: theme.spacing(1),
    },
    box:{
      backgroundColor: '#fff5ee',
      opacity: 1,
    }
}));

export default function BasicTextFields(props) {
  const classes = useStyles();
  const shListsContext = useContext(ShListsContext);
  const [productUrl, setProductUrl] = useState('');
  console.log("AddNewItemBar",props.listId);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewProduct(props.listId, shListsContext.dispatchNewProduct, {url: productUrl});
    setProductUrl('');
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <Container align="center" maxWidth="sm" >
            <Box width="sm" height="sm" className={classes.box} borderRadius={30}>
                <Container width="90%">
            <Grid container spacing={1} alignItems="flex-end" align="center" width="90%">
            
                <Grid item xs={12} md={8}>
                <TextField 
                    fullWidth
                    type="url"
                    name="url"
                    id="outlined-basic" 
                    color="secondary" 
                    placeholder="Paste your link here" 
                    variant="standard" 
                    className={classes.text}
                    onChange={e => setProductUrl(e.target.value)}/>
                </Grid>
                <Grid item xs={2} md={4}>
                <IconButton 
                    color="secondary" 
                    aria-label="add" 
                    className={classes.link} 
                    onClick={handleSubmit}>
                    <AddBoxIcon fontSize="large"/>
                </IconButton>
                </Grid>
            </Grid>
            </Container>
            </Box>
            </Container>
    </form>
  );
}