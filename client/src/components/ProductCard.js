import React, {useContext} from 'react';
import ShListsContext from '../state_management/ShListsContext';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, 
    Grid, 
    Card, 
    CardActionArea, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Button
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {baseUrl} from '../utils/baseUrl';
import {cutContentLength, covertNumberDecimal} from '../utils/transformText';

const linethrough= {
    "textDecoration": "line-through",
}

const useStyles = makeStyles((theme)=>({
    card: {
        display: 'flex',
        maxHeight:"120px"
    },
    description: {
        display:"flex",
        width:"95%",
    },
    cardMedia: {
        width: 160,
    },
    cardContent: {
        width:"100%",
    },
}));


export default function ProductCard(props) {
    const shListsContext = useContext(ShListsContext);
    const product = props.product
    const deleteProductUrl = `/lists/${props.listId}/products/${props.product._id}`; 
    const classes = useStyles();
    const addDefaultImg=(ev)=>{
        ev.target.src = 'https://source.unsplash.com/8ca1no8JQ1w/640x426'
    }
    

    const handleRevome = () => {
            shListsContext.hideProduct(props.product);
            shListsContext.handleProductDeletion(props.listId,props.product._id)

        return fetch(baseUrl + deleteProductUrl, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
        })
        .then(response => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
            },
            error => {
                    var errmess = new Error(error.message);
                    throw errmess;
        })
        .then(response => response.json())
        .then(res=>{shListsContext.hideProduct(props.product);
            shListsContext.handleProductDeletion(props.listId,props.product._id);})
        .catch(error =>console.log('product-deleting failed', error.message));
    }

    return (

            <Card className={classes.card} >
                <CardMedia 
                    component="img"
                    className={classes.cardMedia} 
                    onError={addDefaultImg}
                    src={product.image} 
                    title={product.name}
                    alt={product.name}/>
                <CardActionArea component="a" href={product.url} target="_blank" rel="noreferrer">
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6">
                            {cutContentLength(product.name,40,"no product name")}
                        </Typography>
                        <Typography variant="subtitle2" paragraph className={classes.description}>
                            {cutContentLength(product.description,100,"no description")}
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} md={6} lg={6}>
                            <Typography color="textSecondary" style={linethrough}>
                                Price: $ {covertNumberDecimal(product.lastprice)}
                            </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                            <Typography color="primary">
                                New Price: $ {covertNumberDecimal(product.currentprice)}
                            </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <CardActions >
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        size="small"
                        startIcon={<DeleteForeverIcon />}
                        onClick={handleRevome}
                >remove
                </Button>
                </CardActions>
                </Card>
        

    );
}

ProductCard.propTypes = {
    product: PropTypes.object,
};