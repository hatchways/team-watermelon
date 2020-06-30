import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShoppingLists from '../components/ShoppingLists';




export default function Pricing() {

  return (
    <React.Fragment>
        <CssBaseline />
        <Navbar/>
        <ShoppingLists/>
        <Footer/>
    </React.Fragment>
  );
}