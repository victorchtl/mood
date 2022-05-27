import React, { useState } from 'react'
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
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import FriendsDrawer from '../friends-drawer/friends-drawer';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import FollowingList from '../user-following/UserFollowing';
import TopList from '../top-list/top-list';

function BottomBar() {

    const [friendsDrawer, setFriendsDrawer] = useState(false)
    const [topDrawer, setTopDrawer] = useState(false)

    const displayFriendsDrawer = () => {
        if (friendsDrawer === false) {
            setFriendsDrawer(true)
        } else setFriendsDrawer(false)
    }

    const displayTopDrawer = () => {
        if (topDrawer === false) {
            setTopDrawer(true)
        } else setTopDrawer(false)
    }

    return (
        <div>
            <Paper sx={{ position: 'fixed', zIndex: 2000, bottom: 0, left: 0, right: 0, display: { xs: 'block', md: 'none', lg: 'none' } }} elevation={3} color={'primary'}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Top" icon={<EmojiEventsRoundedIcon />} onClick={displayTopDrawer}/>
                    <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
                    <BottomNavigationAction label="Friends" icon={<PeopleAltRoundedIcon />} onClick={displayFriendsDrawer} />
                </BottomNavigation>
            </Paper>
            <Drawer anchor={'right'} open={friendsDrawer} onClose={displayFriendsDrawer}>
                <Button onClick={displayFriendsDrawer}><CloseIcon /></Button>
                <FollowingList />
            </Drawer>
            <Drawer anchor={'left'} open={topDrawer} onClose={displayTopDrawer}>
                <Button onClick={displayTopDrawer}><CloseIcon /></Button>
                <TopList />
            </Drawer>
        </div>
    )
}

export default BottomBar