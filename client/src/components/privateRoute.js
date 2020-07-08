import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, isAuthenticated }) => (
    <Route render={props => isAuthenticated === true
        ? <Component auth={isAuthenticated} {...props} />
        : <Redirect to={{pathname:'/home'}} />
    }
    />
);

export default PrivateRoute;