import React,{useContext} from "react";
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import LandingPage from "../pages/Landingpage";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import { createBrowserHistory } from 'history'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthContext from '../state_management/AuthContext';
import ProductsList from '../components/ProductsList';
import FriendsList from '../components/FriendsList';
import {placeholderFriends} from '../components/PlaceHolder';
import ShListsContext from '../state_management/ShListsContext';
import PrivateRoute from './privateRoute';
import ShoppingLists from "../components/ShoppingLists";



const history = createBrowserHistory();

const Routes = ()=> {
    const shListsContext = useContext(ShListsContext);
    const authContext = useContext(AuthContext);

    const ProductsWithListId = (props) => {
        return(
            <ProductsList 
                listId={(shListsContext.lists.filter(list=>list._id === props.listId))? props.listId:null}
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
                    exact path='/profile' 
                    component={()=><ProfilePage/>} />
                <Route 
                    exact path='/users/:name' 
                    component={({match})=>{
                        if(match.params.name !== undefined)
                            return <ShoppingLists userName={match.params.name}/>
                        return <Redirect to={{pathname:'/home'}} />}} 
                    />
                <Route 
                    exact path='/users/:name/productslist/:listId' 
                    component={({match})=>{
                        if(match.params.name !== undefined)
                            return <ProductsList userName={match.params.name} listId={match.params.listId}/>
                        return <Redirect to={{pathname:'/home'}} />}} 
                    />

                <Redirect to="/home" />
            </Switch>
            <Footer/>
        </Router>
    )
}

export default Routes;