import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from'@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

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

const cutContentLength = (str, limit,defaultStrin)=>{
    if(!str || str == null){
        return defaultStrin
    }
    str = str.toString();
    if(str.length > limit){
        return str.slice(0, limit) + '...'
    }
    return str
}

const covertNumberDecimal=(numberDecimal)=>{
    const strArr = JSON.stringify(numberDecimal).split('"')
    if(strArr.length >= 4){
        return strArr[3];
    }
    return ""
};


export default function ProductCard(prop) {
    const product = prop.product
    const classes = useStyles();
    const addDefaultImg=(ev)=>{
        ev.target.src = 'https://source.unsplash.com/8ca1no8JQ1w/640x426'
    }
    
    return (

        
            <Card className={classes.card} >
                <CardMedia 
                    component="img"
                    className={classes.cardMedia} 
                    onError={addDefaultImg}
                    src={product.url} 
                    title={product.name}
                    alt={product.name}/>
                {/* <Grid container className={classes.cardDetails}> */}
                <CardActionArea component="a" href={product.url} target="_blank" rel="noreferrer">
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6">
                            {cutContentLength(product.name,15,"no product name")}
                        </Typography>
                        <Typography variant="subtitle2" paragraph className={classes.description}>
                            {cutContentLength(product.description,100,"no description")}
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} md={6} lg={6}>
                            <Typography color="textSecondary" style={linethrough}>
                                price: {covertNumberDecimal(product.lastprice)}$
                            </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                            <Typography color="primary">
                                new price: {covertNumberDecimal(product.currentprice)}$
                            </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <CardActions >
                    <Button variant="outlined" color="primary" to="#" size="small">remove</Button>
                </CardActions>
                {/* </Grid> */}
                </Card>
        

    );
}

ProductCard.propTypes = {
    product: PropTypes.object,
};