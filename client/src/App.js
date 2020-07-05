import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import AuthCntextState from './state_management/AuthContextState';

import "./App.css";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <AuthCntextState/>
        </MuiThemeProvider>
    );
}

export default App;
