import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../state_management/AuthContext';
import ShListsContext from '../state_management/ShListsContext';
import { fetchProducts } from '../state_management/actionCreators/productActs';
import { cutContentLength } from '../utils/transformText';

const useStyles = makeStyles((theme) => ({
	link: {
		margin: theme.spacing(1, 1.5)
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardMedia: {
		paddingTop: '80%' // 16:9
	},
	cardContent: {
		flexGrow: 1
	}
}));

const FriendListCard = (prop) => {
	const list = prop.list;
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardMedia className={classes.cardMedia} image={list.image} title={list.title} />
				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant="h5" component="h2">
						{list.title}
					</Typography>
					<Typography gutterBottom component="h5">
						{cutContentLength(list.subtitle, 30, 'my list')}
					</Typography>
					<Typography>{list.products.length} items</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					fullWidth
					component={RouterLink}
					to={`/productslist/${list._id}`}
					color="primary"
					variant="outlined"
					className={classes.link}
				>
					View
				</Button>
				<Button fullWidth href="#" color="primary" variant="outlined" className={classes.link}>
					Edit
				</Button>
			</CardActions>
		</Card>
	);
};

export default FriendListCard;
