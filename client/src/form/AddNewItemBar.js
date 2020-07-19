import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Grid,
  Button,
  Container,
  Box,
  CircularProgress
} from '@material-ui/core';
import ShListsContext from '../state_management/ShListsContext';
import {addNewProduct} from "../state_management/actionCreators/productActs";

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
      backgroundColor: 'white',
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
  const shListsContext = useContext(ShListsContext);
  const [productUrl, setProductUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  }

  useEffect(() => {
    let isUnmounted = false;
    if(loading) {
      let promise = addNewProduct(props.listId, shListsContext.dispatchNewProduct, {url: productUrl}, shListsContext.showProduct);
        promise.then(() => {
            if(!isUnmounted) {
                setLoading(false);
                setProductUrl('');
            }
        });
    }
    return () => {
        isUnmounted = true;
    };
}, [loading]);


  return (
    <form className={classes.root} noValidate autoComplete="off">
        <Container align="center" maxWidth="md" >
            <Box width="sm" height="sm" className={classes.box} borderRadius={50} flexGrow={1}>
                <Container>
            <Grid container spacing={1} direction="row" alignItems="center" align="center" className={classes.bar}>
            
                <Grid item xs={12} md={8}>
                <CustomTextField 
                    fullWidth
                    type="url"
                    name="url"
                    id="outlined-basic" 
                    color="secondary" 
                    placeholder="Paste your link here" 
                    variant="outlined" 
                    className={classes.text}
                    onChange={e => setProductUrl(e.target.value)}/>
                </Grid>
                <Grid item xs={2} md={4}>
                <Button 
                    color="primary"
                    variant="contained" 
                    size="large"
                    fullWidth
                    aria-label="add" 
                    className={classes.btn}
                    disabled={loading}
                    onClick={handleSubmit}
                    disableElevation>
                    Add
                    {loading && <CircularProgress size={48} className={classes.buttonProgress} />}
                </Button>
                </Grid>
            </Grid>
            </Container>
            </Box>
            </Container>
    </form>
  );
}