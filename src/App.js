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
import Profile from './app/components/profile/Profile';
import User from './app/components/user/User';
import UserFollowing from './app/components/shared/user-following/UserFollowing';
import UserFollowers from './app/components/shared/user-followers/UserFollower';
import UserMoods from './app/components/shared/user-moods/UserMoods';
import ProfileFollowing from './app/components/profile/profile-following/ProfileFollowing';
import ProfileFollowers from './app/components/profile/profile-followers/ProfileFollowers';
import ProfileMoods from './app/components/profile/profile-moods/ProfileMoods';
import ProfileEdit from './app/components/profile/profile-edit/ProfileEdit';


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

            <Route element={<Profile />}>
              <Route exact path="/profile" element={<ProfileMoods />} />
              <Route exact path="/profile/following" element={<ProfileFollowing />} />
              <Route exact path="/profile/followers" element={<ProfileFollowers />} />
            </Route>
            <Route exact path="/profile/edit" element={<ProfileEdit />} />
            <Route element={<User id={':id'} />}>
              <Route exact path="/user/:id" element={<UserMoods id={':id'} />} />
              <Route exact path="/user/:id/following" element={<UserFollowing id={':id'} />} />
              <Route exact path="/user/:id/followers" element={<UserFollowers id={':id'} />} />
            </Route>
          </Route>
          <Route path="" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
