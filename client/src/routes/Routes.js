import React,{Component} from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LandingPage from "../pages/Landingpage";
import MainPage from "../pages/MainPage";

class Routes extends Component{
    render(){
        return(
            <div>
                <Switch location={this.props.location}>
                    <Route path='/home' component={()=><LandingPage/>} />
                    <Route exact path='/main' component={MainPage} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        )
    }
}
export default withRouter(Routes);