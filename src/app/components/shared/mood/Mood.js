import React from 'react'
import './Mood.css'

function Mood({id, message, user}) {
  return (
    <div className='mood'>
        <h4>{id}</h4>
        <h5>{user}</h5>
        <p>{message}</p>
    </div>
  )
}

export default Mood