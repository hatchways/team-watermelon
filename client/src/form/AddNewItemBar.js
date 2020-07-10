import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
}));

export default function BasicTextFields(props) {
  const classes = useStyles();
  const [productUrl, setProductUrl] = useState('');
  console.log("AddNewItemBar",props.listId);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productUrl);
    axios.post('/scraping', {
      url: productUrl
    })
    .then((response) => {
      console.log(response);

      axios.post("/lists/"+props.listId+"/products/new", {
        url: productUrl,
        name: response.data.title,
        description: response.data.description,
        image: response.data.image,
        price: response.data.price
      })
      .then(function(response) {
        console.log("will return nothing"+ response);
        //can return product id or just re-render the product details from DB.
      })
      .catch((error) => {
        console.log(error);
      });  
    })
    .catch((error) => {
      console.log(error);
    });

    /*This will be uncommented if we remove /scraping and just pass url to BE.
    axios.post("/lists/"+props.listId+"/products/new", {
      url: productUrl
    })
    .then(function(response) {
      console.log("will return nothing"+ response);
      //can return extracted data or just re-render the product details from DB.
    })
    .catch((error) => {
      console.log(error);
    });*/

  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        
        <Grid container spacing={1} justify="center">
            <Grid item xs={10} md={8} style={{textAlign:'center'}}>
            <TextField 
                fullWidth
                label="Product Url"
                id="product-url" 
                color="secondary" 
                placeholder="Paste product link here" 
                variant="outlined" 
                className={classes.text}
                onChange={e => setProductUrl(e.target.value)}/>
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.link}>
                Add Product
            </Button>
            </Grid>
        </Grid>
        
    </form>
  );
}