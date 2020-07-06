import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HeroLayout from './HeroLayout';
import LoginForm from './loginRegisterModal';


const backgroundImage = "assets/images/bg.jpg";


const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function Hero(props) {
  const { classes } = props;

  return (
    <HeroLayout backgroundClassName={classes.background}>
        {/* Increase the network loading priority of the background image. */}
        <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
        <Typography color="inherit" align="center" variant="h2" marked="center">
            Track your Favorites
        </Typography>
        <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
            Every deal is a Big Deal!
        </Typography>
        <LoginForm
            color="primary"
            variant="contained"
            size="large"
            className={classes.button}
        />
        <Typography variant="body2" color="inherit" className={classes.more}>
            Discover the best shopping experience
        </Typography>
    </HeroLayout>
  );
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hero);