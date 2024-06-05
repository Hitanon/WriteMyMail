import Main from "../pages/Main";
import Home from "../pages/Home";
import ImproveLetter from "../pages/ImproveLetter";
import GenerateLetter from "../pages/GenerateLetter";
import Account from "../pages/Account";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import AddEmail from "../pages/AddEmail";
import AddInfo from "../pages/AddInfo";

import {
    MAIN_ROUTE,
    HOME_ROUTE,
    IMPROVE_LETTER_ROUTE,
    GENERATE_LETTER_ROUTE,
    ACCOUNT_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    ADD_EMAIL_ROUTE,
    ADD_INFO_ROUTE
} from "./Consts";

export const routes = [
    {
        path: MAIN_ROUTE,
        element: <Main />,
    },
    {
        path: HOME_ROUTE,
        element: <Home />,
    },
    {
        path: IMPROVE_LETTER_ROUTE,
        element: <ImproveLetter />,
    },
    {
        path: GENERATE_LETTER_ROUTE,
        element: <GenerateLetter />,
    },
    {
        path: ACCOUNT_ROUTE,
        element: <Account />,
    },
    {
        path: LOGIN_ROUTE,
        element: <Login />,
    }, 
    {
        path: REGISTRATION_ROUTE,
        element: <Registration />,
    },
    {
        path: ADD_EMAIL_ROUTE,
        element: <AddEmail />,
    },
    {
        path: ADD_INFO_ROUTE,
        element: <AddInfo />,
    },
];