
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import useStyles from './style';
import React from 'react';
import Typography from '@material-ui/core/Typography';


const ListCard = (tier)=>{
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia
            className={classes.cardMedia}
            image={tier.image}
            title={tier.title}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {tier.title}
                </Typography>
                <Typography>
                    {tier.items} items
                </Typography>
            </CardContent>
            <CardActions>
                <Button fullWidth href="#" color="primary" variant="outlined" className={classes.link}>
                    View
                </Button>
                <Button fullWidth href="#" color="primary" variant="outlined" className={classes.link}>
                    Edit
                </Button>                           
            </CardActions>
        </Card>
    )
}


export default ListCard;