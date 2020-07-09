import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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

export default function BasicTextFields(props) {
  const classes = useStyles();
  const [listData, setListData] = useState({
      title: '',
      imageurl: '',
      listdescription: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(listData);
    axios.post('/lists/new', {
        title: listData.title,
        imageurl: listData.imageurl,
        listdescription: listData.listdescription
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        
        <Grid container spacing={1} justify="center">
            <Grid item xs={10} md={8} style={{textAlign:'center'}}>
                <TextField 
                    fullWidth
                    label="Title"
                    id="list-title" 
                    color="secondary" 
                    placeholder="Enter list title" 
                    variant="outlined" 
                    className={classes.text}/>
                <TextField 
                    fullWidth
                    label="Image Url"
                    id="list-image" 
                    color="secondary" 
                    placeholder="Paste list cover image url" 
                    variant="outlined" 
                    className={classes.text}/>
                <TextField 
                    fullWidth
                    multiline
                    label="List Description"
                    id="list-description" 
                    color="secondary" 
                    placeholder="Enter list description" 
                    variant="outlined" 
                    className={classes.text}/>
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.link}>
                    Create List
                </Button>
            </Grid>
        </Grid>
        
    </form>
  );
}