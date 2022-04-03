import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../home/Home';

const PublicRoutes = (props) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    return (
        !currentUser ? <Outlet /> : <Navigate to="/home" />
    );
};

export default PublicRoutes