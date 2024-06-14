import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { reaction } from "mobx";

import App from './App';
import UserStore from "./store/UserStore";
import GenerateParamsStore from "./store/GenerateParamsStore";
import LetterStore from "./store/LetterStore";
import SendMailStore from "./store/SendMailStore";

import 'bootstrap/dist/css/bootstrap-grid.css';
import './index.css';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
const Context = createContext(null);

const userStore = new UserStore();
const generateParamsStore = new GenerateParamsStore();
const letterStore = new LetterStore();
const sendMailStore = new SendMailStore(userStore);

reaction(
    () => userStore.emails.slice(),
    () => sendMailStore.updateSenderMail()
);

root.render(
  <Context.Provider value={{
    user: userStore,
    generateParams: generateParamsStore,
    letter: letterStore,
    sendMail: sendMailStore,
  }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Context.Provider>
);

export { Context };
