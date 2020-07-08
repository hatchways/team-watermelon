import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, auth }) => (
    <Route render={props => auth === true
        ? <Component auth={auth} {...props} />
        : <Redirect to={{pathname:'/home'}} />
    }
    />
);

export default PrivateRoute;