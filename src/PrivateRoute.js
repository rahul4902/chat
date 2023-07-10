import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLogin } from './utils/auth';

const PrivateRoute = () => {
    const auth = isLogin();
    // return !!token; // return true if the token exists, false otherwise

    // const auth = isLogin(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;