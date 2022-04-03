import { Avatar } from '@mui/material'
import React from 'react'
import './HeaderItem.css'
import { deepOrange, deepPurple } from '@mui/material/colors';

function HeaderItem({avatar, Icon, title, username}) {
  return (
    <div className='headerItem'>
      {avatar && <Avatar className='headerItem__icon' src={avatar} alt={username} sx={{ bgcolor: deepOrange[500] }}/>}
      {Icon && <Icon className='headerItem__icon' />}
      {title && <h3 className='headerItem__title'>{title}</h3>}
    </div>
  )
}

export default HeaderItem