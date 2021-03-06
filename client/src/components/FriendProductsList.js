import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Container, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProductCard from './ProductCard';
import AddNewItemBar from '../form/AddNewItemBar';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(5)
	},
	TopContent: {
		padding: theme.spacing(8, 0, 10)
	}
}));

export default function ProductsList(props) {
	const classes = useStyles();

	return (
		<section className={classes.root}>
			<Container maxWidth="md" component="main">
				<Typography variant="h5" color="textSecondary" component="p">
					Lists Name:
				</Typography>
				<br />
				<Grid container spacing={1} alignItems="center">
					{shListsContext.products.map((product) => (
						<Grid item key={product._id} xs={12} md={12} lg={12}>
							<ProductCard product={product} listId={props.listId} />
						</Grid>
					))}
				</Grid>
			</Container>
			<Grid container align="center" className={classes.TopContent}>
				<Grid item xs={12}>
					<Button
						component={RouterLink}
						variant="contained"
						color="primary"
						startIcon={<ArrowBackIcon />}
						to="/main"
					>
						Back To Lists
					</Button>
				</Grid>
			</Grid>
		</section>
	);
}

ProductsList.propTypes = {
	listID: PropTypes.string
};
