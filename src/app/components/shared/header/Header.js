import React from 'react'
import './Header.css'
import HeaderItem from './header-item/HeaderItem';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../../actions/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

function Header({ username, profilImgColor }) {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = (e) => {
    dispatch(logout())


  };

  const pages = ['Products', 'Pricing', 'Blog'];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" color='white' elevation={0} sx={{ color: 'black', borderBottom: 'solid 1px', borderBottomColor: 'border' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color='primary'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                HOME
              </Button>
            </Menu>
          </Box>
          <Typography variant="h5" fontWeight={800} fontFamily={'Fredoka One'} color='primary' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>MOOD</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography variant="h5" fontWeight={800} fontFamily={'Fredoka One'} color='primary' sx={{ display: { xs: 'none', md: 'flex' }, justifyContent:"center", alignItems:"center", paddingRight:"10px" }}>MOOD</Typography>
            <IconButton onClick={() => navigate('/home')}>
              <HomeRoundedIcon sx={{}} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#eeee", padding: "5px", borderRadius: "10px" }}>
              <SearchIcon />
              <input style={{ background: "none", border: "none", outline: "none" }}></input>
            </div>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username.toUpperCase()} src="/static/images/avatar/2.jpg" sx={{ bgcolor: profilImgColor }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem key="profile" onClick={() => {
                navigate("/profile")
                handleCloseUserMenu()
              }}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem key="logout" onClick={logOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  )
}

export default Header