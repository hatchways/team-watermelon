import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';


const useStyles = makeStyles((theme)=>({
    card: {
        display: 'flex',
    },
    cardDetails: {
        display:"flex",
        width:"100%",
        zIndex:1,
    },
    cardMedia: {
        width: 160,
    },
    cardContent: {
        width:"100%",
        marginTop: theme.spacing(2),
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        margin: theme.spacing(1),
        zIndex:1,
        alignItems: 'left',
    },
    box:{
        zIndex:0,
        backgroundColor: '#FF7F50',
        opacity: 0.4
    }
}));

export default function ProductCard(friend) {
    const classes = useStyles();

    return (
        <CardActionArea>
        <Box position="relative" left="0px">
        <Card className={classes.card} >
            <Box width="100%" height="28%" className={classes.box} position="absolute" left="0%" borderRadius="borderRadius"/>
            {/* <CardMedia className={classes.cardMedia} image={friend.image} title={friend.name}/> */}
            <Box  position="relative" left="0%" alignItems='left'>
            <Avatar alt={friend.name} src={friend.image} className={classes.large}/>
            </Box>
            <div className={classes.cardDetails}>
                <CardContent className={classes.cardContent}>
                    <Typography component="h2" variant="h5">
                        {friend.name}
                    </Typography>
                    {/* <Typography variant="subtitle1" paragraph>
                        {friend.description}
                    </Typography> */}
                </CardContent>
                <CardActions>
                    <Button variant="outlined" color="primary" href="#">follow</Button>
                </CardActions>
            </div>
        </Card>
        </Box>
        </CardActionArea>
    );
}