import React from 'react'
import './Header.css'
import HeaderItem from './header-item/HeaderItem';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

function Header() {
  return (
    <div className='header'>
      <div className='headerLeft'>
        <BubbleChartIcon sx={{ fontSize: 40 }} color="primary" className='logo' />
        <h3 className='headerLeft__title'>Mood</h3>
        <div className='header__search'>
          <SearchIcon />
          <input type='text'></input>
        </div>
      </div>
      <div className='headerRight'>
      <HeaderItem Icon={HomeRoundedIcon} title='Home'/>
      <HeaderItem Icon={PeopleAltRoundedIcon} title='friends'/>
      <HeaderItem avatar={'coucou'} title='me'/>
      </div>
    </div>
  )
}

export default Header