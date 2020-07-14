import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from '../state_management/AuthContext';

const PrivateRoute = ({component: Component }) => {
    const authContext = useContext(AuthContext);
    return (
    <Route render={props => authContext.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname:'/home'}} />
    }
    />
    );
}

export default PrivateRoute;