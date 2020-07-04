import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import Routes from './routes/Routes';

import "./App.css";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Routes/>
        </MuiThemeProvider>
    );
}

export default App;
