
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    link: {
      margin: theme.spacing(1, 1.5),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '80%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    }
  }));

const ListCard = (list)=>{
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia
            className={classes.cardMedia}
            image={list.cover_img}
            title={list.name}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {list.name}
                </Typography>
                <Typography>
                    {list.products_list.length} items
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