import React from 'react'
import { useParams } from 'react-router-dom';

function User() {
    let { id } = useParams();
  return (
    <div>User {id}</div>
  )
}

export default User