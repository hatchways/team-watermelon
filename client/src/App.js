import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter} from "react-router-dom";

import { theme } from "./themes/theme";
import Routes from './routes/Routes';

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
