import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import UserStore from "./store/UserStore";

import 'bootstrap/dist/css/bootstrap-grid.css';
import './index.css';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
const Context = createContext(null);

root.render(
  <Context.Provider value={{
    user: new UserStore(),
  }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Context.Provider>
);

export { Context };
