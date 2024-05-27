import Main from "../pages/Main";
import Home from "../pages/Home";
import ImproveLetter from "../pages/ImproveLetter";
import GenerateLetter from "../pages/GenerateLetter";
import Account from "../pages/Account";

import {
    MAIN_ROUTE,
    HOME_ROUTE,
    IMPROVE_LETTER_ROUTE,
    GENERATE_LETTER_ROUTE,
    ACCOUNT_ROUTE,
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
];