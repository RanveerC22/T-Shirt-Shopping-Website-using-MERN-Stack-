import React from 'react'
import { Redirect } from 'react-router-dom'
import Base from '../core/Base'




const UserDashBoard = () => {
  return (
    <Base title='User DashBoard Page'
    description='Hello User Enjoy Shopping'>
    <Redirect to={"/"}></Redirect>
    </Base>
  )
}

export default UserDashBoard