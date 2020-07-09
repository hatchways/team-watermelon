import React from 'react';
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
    },
    cardDetails: {
        display:"flex",
        width:"100%",
    },
    cardMedia: {
        width: 160,
    },
    cardContent: {
        width:"100%",
    },
}));

export default function ProductCard(prop) {
    const product = prop.product
    const classes = useStyles();

    return (

        
            <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image={product.image} title={product.name}/>
                {/* <Grid container className={classes.cardDetails}> */}
                <CardActionArea component="a" href={product.url} target="_blank" rel="noreferrer">
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5">
                            {product.name}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {product.description}
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} md={6} lg={6}>
                            <Typography color="textSecondary" style={linethrough}>
                                price: {product.lastprice}$
                            </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                            <Typography color="primary">
                                new price: {product.currentprice}$
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