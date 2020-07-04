import React from "react";
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import LandingPage from "../pages/Landingpage";
import MainPage from "../pages/MainPage";
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

const Routes = ()=> {
    return(
        <Router history={history}>
            <Switch>
                <Route path='/home' component={()=><LandingPage/>} />
                <Route exact path='/main' component={MainPage} />
                <Redirect to="/home" />
            </Switch>
        </Router>
    )
}

export default Routes;