import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';




export default function LandingPage() {

  return (
    <React.Fragment>
        <CssBaseline />
        <Navbar/>
        <Hero/>
        <Footer/>
    </React.Fragment>
  );
}