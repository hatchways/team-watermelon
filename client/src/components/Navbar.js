import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { makeStyles } from '@material-ui/core/styles';
import LoginRegisterModal from '../components/loginRegisterModal.js';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	toolbar: {
		flexWrap: 'wrap'
	},
	toolbarTitle: {
		flexGrow: 1
	},
	link: {
		margin: theme.spacing(1, 1.5)
	},
	margin: {
		margin: theme.spacing(1)
	}
}));

const Navbar = () => {
	const classes = useStyles();

	return (
		<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
					<IconButton color="primary" aria-label="home" className={classes.margin} href="/home">
						<LocalMallIcon fontSize="large" />
					</IconButton>
					BigDeal
				</Typography>
				<nav>
					<Link variant="button" color="textPrimary" href="/main" className={classes.link}>
						Shopping Lists
					</Link>
					<Link variant="button" color="textPrimary" href="#" className={classes.link}>
						Friends
					</Link>
					<Link variant="button" color="textPrimary" href="#" className={classes.link}>
						Notifications
					</Link>
				</nav>
				<LoginRegisterModal />
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
