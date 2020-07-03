import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    link: {
        margin: theme.spacing(1),
    },
    text: {
        margin: theme.spacing(1),
    },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
        
        <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={10} md={6}>
            <TextField 
                fullWidth
                id="outlined-basic" 
                color="secondary" 
                placeholder="Paste your link here" 
                variant="standard" 
                className={classes.text}/>
            </Grid>
            <Grid item xs={8} md={5}>
            <TextField 
                fullWidth
                id="outlined-basic" 
                color="secondary" 
                variant="standard" 
                className={classes.text}/>
            </Grid>
            <Grid item xs={2} md={1}>
            <IconButton color="secondary" aria-label="add" className={classes.link} href="#">
                <AddBoxIcon fontSize="large"/>
            </IconButton>
            </Grid>
            </Grid>
        
    </form>
  );
}