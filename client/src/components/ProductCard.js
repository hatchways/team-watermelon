import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const linethrough= {
    "textDecoration": "line-through",
}

const useStyles = makeStyles({
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
});

export default function ProductCard(product) {
    const classes = useStyles();

    return (

        <CardActionArea component="a" href={product.url} target="_blank" rel="noreferrer">
            <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image={product.image} title={product.name}/>
                <div className={classes.cardDetails}>
                    <CardContent className={classes.cardContent}>
                        <Typography component="h2" variant="h5">
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
                </div>
                </Card>
        </CardActionArea>

    );
}