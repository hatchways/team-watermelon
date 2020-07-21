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
import ShListsContext from '../state_management/ShListsContext';
import PrivateRoute from './privateRoute';
import NotificationsList from '../components/NotificationsList';



const history = createBrowserHistory();

const Routes = ()=> {
    const shListsContext = useContext(ShListsContext);
    const authContext = useContext(AuthContext);

    const ProductsWithListId = (props) => {
        return(
            <ProductsList 
                listId={(shListsContext.lists.filter(list=>list._id === props.listId))? props.listId:null}
                products={placeholderPL} 
            />
        );
    };


    return(
        
        <Router history={history}>
            <Navbar history={history}/>
            <Switch>
                <Route 
                    path='/home' 
                    component={()=><LandingPage/>} />
                <PrivateRoute 
                    exact path='/main' 
                    component={()=><MainPage/>} />
                <Route 
                    path='/productslist/:listId' 
                    component={({match})=>{
                        if(authContext.isAuthenticated)
                            return <ProductsWithListId listId={match.params.listId}/>
                        return <Redirect to={{pathname:'/home'}} />}}
                    />
                <PrivateRoute 
                    path='/friendslist' 
                    component={()=><FriendsList friends={placeholderFriends}/>}
                    />
                <PrivateRoute 
                    path='/notificationslist' 
                    component={()=><NotificationsList/>}
                />

                <Redirect to="/home" />
            </Switch>
            <Footer/>
        </Router>
    )
}

export default Routes;