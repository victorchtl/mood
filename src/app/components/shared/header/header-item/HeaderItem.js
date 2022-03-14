import { Avatar } from '@mui/material'
import React from 'react'
import './HeaderItem.css'

function HeaderItem({avatar, Icon, title}) {
  return (
    <div className='headerItem'>
      {avatar && <Avatar className='headerItem__icon' src={avatar} alt='img'/>}
      {Icon && <Icon className='headerItem__icon' />}
      {title && <h3 className='headerItem__title'>{title}</h3>}
    </div>
  )
}

export default HeaderItem