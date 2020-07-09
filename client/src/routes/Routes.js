import React,{useContext} from "react";
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import LandingPage from "../pages/Landingpage";
import MainPage from "../pages/MainPage";
import { createBrowserHistory } from 'history'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthContext from '../state_management/AuthContext';
import ProductsList from '../components/ProductsList';
import FriendsList from '../components/FriendsList';
import {placeholderPL, placeholderFriends} from '../components/PlaceHolder';

//disabling privateRoutes for now for developing FE
import PrivateRoute from '../components/privateRoute';



const history = createBrowserHistory();

const Routes = ()=> {
    // eslint-disable-next-line
    const authContext = useContext(AuthContext);
    return(
        
        <Router history={history}>
            <Navbar/>
            <Switch>
                <Route path='/home' component={()=><LandingPage/>} />
                <Route exact path='/main' component={()=><MainPage/>}/>
                {/*<PrivateRoute exact path='/main'
                            auth={authContext.isAuthenticated}
                            component={()=><MainPage/>} /> */}
                <Route path='/productslist' component={()=><ProductsList products={placeholderPL}/>}/>
                <Route path='/friendslist' component={()=><FriendsList friends={placeholderFriends}/>}/>

                <Redirect to="/home" />
            </Switch>
            <Footer/>
        </Router>
    )
}

export default Routes;