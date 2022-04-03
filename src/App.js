import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import './App.css';
import Home from './app/components/home/Home';
import Login from './app/components/login/Login';
import Register from './app/components/register/Register';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import PrivateRoutes from './app/components/routes/PrivateRoutes';
import PublicRoutes from './app/components/routes/PublicRoutes';
import Profile from './app/components/profile/profile';
import User from './app/components/user/User';


function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
        background: '#F3F2EF',
        white: '#F3F2EF'
      },
      background: {
        main: '#F3F2EF'
      },
      white: 'white',
      border: '#dbdbdb'
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/user/:id" element={<User id={':id'}/>} />
          </Route>
          <Route path="" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
