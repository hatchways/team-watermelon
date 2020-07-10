import React,{useContext} from "react";
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import LandingPage from "../pages/Landingpage";
import MainPage from "../pages/MainPage";
import { createBrowserHistory } from 'history'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import AuthContext from '../state_management/AuthContext';
import ProductsList from '../components/ProductsList';
import FriendsList from '../components/FriendsList';
import {placeholderPL, placeholderFriends} from '../components/PlaceHolder';
import ShListsContext from '../state_management/ShListsContext';

//disabling privateRoutes for now for developing FE
// import PrivateRoute from '../components/privateRoute';



const history = createBrowserHistory();

const Routes = ()=> {
    const shListsContext = useContext(ShListsContext);
    // const authContext = useContext(AuthContext);
    //{this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
    const productsWithListId = ({match}) => {
        return(
            <ProductsList 
                listId={(shListsContext.lists.filter(list=>list._id === match.params.listId))? match.params.listId:""}
                products={placeholderPL} 
            />
        );
    };


    return(
        
        <Router history={history}>
            <Navbar/>
            <Switch>
                <Route path='/home' component={()=><LandingPage/>} />
                <Route exact path='/main' component={()=><MainPage/>}/>
                {/*<PrivateRoute exact path='/main'
                            auth={authContext.isAuthenticated}
                            component={()=><MainPage/>} /> */}
                <Route 
                    path='/productslist/:listId' 
                    component={productsWithListId}
                    />
                <Route 
                    path='/friendslist' 
                    component={()=><FriendsList friends={placeholderFriends}/>}
                    />

                <Redirect to="/home" />
            </Switch>
            <Footer/>
        </Router>
    )
}

export default Routes;