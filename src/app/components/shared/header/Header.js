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
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';


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
    // <div className='header'>
    //   <div className='headerLeft'>
    //     <BubbleChartIcon sx={{ fontSize: 40 }} color="primary" className='logo' onClick={logOut}/>
    //     <h3 className='headerLeft__title'>Mood</h3>
    //     <div className='header__search'>
    //       <SearchIcon />
    //       <input type='text'></input>
    //     </div>
    //   </div>
    //   <div className='headerRight'>
    //   <HeaderItem Icon={HomeRoundedIcon} title='Home'/>
    //   <HeaderItem Icon={PeopleAltRoundedIcon} title='friends'/>
    //   <HeaderItem username={username} avatar={username} title={username ? username : "null"} onClick={logOut}/>
    //   </div>
    // </div>

    <AppBar position="sticky" color='white' elevation={0} sx={{color: 'black', borderBottom: 'solid 1px', borderBottomColor: 'border'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EmojiEmotionsIcon color='primary' fontSize="large"/>
          <Typography variant="h5" fontWeight={800} color='primary'>MOOD</Typography>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username} src="/static/images/avatar/2.jpg" sx={{ bgcolor: profilImgColor }}/>
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

              <MenuItem key="profile" onClick={() => {navigate("/profile")}}>
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