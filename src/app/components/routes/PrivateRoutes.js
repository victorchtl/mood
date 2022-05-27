import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../home/Home';
import Header from '../shared/header/Header';

const PrivateRoutes = (props) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    return (
        currentUser ?
        <React.Fragment>
        <Header username={currentUser && currentUser.username} profilImgColor={currentUser && currentUser.profilImg}/>
        <Outlet />
        </React.Fragment>
        :
        <Navigate to="/login" />
    );
};

export default PrivateRoutes