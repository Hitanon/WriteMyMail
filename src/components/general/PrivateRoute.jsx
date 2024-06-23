import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from "../..";
import { LOGIN_ROUTE } from '../../utils/Consts';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { user } = useContext(Context);

    return user.isAuth ? <Element {...rest} /> : <Navigate to={LOGIN_ROUTE} />;
};

export default PrivateRoute;
