import React,{useContext} from "react";
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import LandingPage from "../pages/Landingpage";
import MainPage from "../pages/MainPage";
import { createBrowserHistory } from 'history'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthContext from '../state_management/AuthContext';
import ProductsList from '../components/ProductsList';

//disabling privateRoutes for now for developing FE

// const PrivateRoute = ({component: Component, auth }) => (
//     <Route render={props => auth === true
//       ? <Component auth={auth} {...props} />
//       : <Redirect to={{pathname:'/home'}} />
//     }
//     />
// )

const placeholderPL = [
    {
        _id:"1",
        name: "product 1",
        description:"description 1",
        url: "https://source.unsplash.com",
        lastprice: 20.5,
        currentprice: 18.3,
        image:"https://source.unsplash.com/random",
    },
    {
        _id:"2",
        name: "product 2",
        description:"description 2",
        url: "https://source.unsplash.com",
        lastprice: 20.5,
        currentprice: 18.3,
        image:"https://source.unsplash.com/random",
    },
    {
        _id:"3",
        name: "product 3",
        description:"description 3",
        url: "https://source.unsplash.com",
        lastprice: 20.5,
        currentprice: 18.3,
        image:"https://source.unsplash.com/random",
    },
    {
        _id:"4",
        name: "product 4",
        description:"description 4",
        url: "https://source.unsplash.com",
        lastprice: 20.5,
        currentprice: 18.3,
        image:"https://source.unsplash.com/random",
    },
    {
        _id:"5",
        name: "product 5",
        description:"description 5",
        url: "https://source.unsplash.com",
        lastprice: 20.5,
        currentprice: 18.3,
        image:"https://source.unsplash.com/random",
    },
];


const history = createBrowserHistory();

const Routes = ()=> {
    // eslint-disable-next-line
    const authContext = useContext(AuthContext);
    return(
        
        <Router history={history}>
            <Navbar/>
            <Switch>
                <Route path='/home' component={()=><LandingPage/>} />
                <Route exact path='/main' component={MainPage} />
                {/* <PrivateRoute path='/shoppinglists'
                            auth={authContext.isAuthenticated}
                            component={MainPage} /> */}
                <Route path='/productslist' component={()=><ProductsList products={placeholderPL}/>}/>
                <Redirect to="/home" />
            </Switch>
            <Footer/>
        </Router>
    )
}

export default Routes;