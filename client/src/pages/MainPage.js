import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ShoppingLists from '../components/ShoppingLists';




export default function MainPage() {

  return (
    <React.Fragment>
        <CssBaseline />
        <ShoppingLists/>
    </React.Fragment>
  );
}