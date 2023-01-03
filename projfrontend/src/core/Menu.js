import React, {Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper'



const currenttab=(history,path)=>{
  if(history.location.pathname===path){
    return {color: "#2ecc72"}
  }else{
    return {color: "#FFFFFF"}
  }
}


const Menu=({history})=> (
    <div>
      <ul className='nav nav-tabs bg-yellow'>
       <li className='nav-item'>
         <Link style={currenttab(history,"/")} className='nav-link' to={"/"}>Home</Link>
       </li>

       <li className='nav-item'>
         <Link style={currenttab(history,"/cart")} className='nav-link' to={"/cart"}>Cart</Link>
       </li>

       {isAuthenticated() && isAuthenticated().user.role===0 && (
        <li className='nav-item'>
        <Link  style={currenttab(history,"/user/dashboard")} className='nav-link' to={"/user/dashboard"}>U Dashboard</Link>
      </li>
       )}

       {isAuthenticated() && isAuthenticated().user.role===1 && (
        <li className='nav-item'>
        <Link style={currenttab(history,"/admin/dashboard")} className='nav-link' to={"/admin/dashboard"}>A Dashboard</Link>
      </li>
       )}

       {!isAuthenticated() && (
        <Fragment>
        <li className='nav-item'>
          <Link style={currenttab(history,"/signup")} className='nav-link' to={"/signup"}>SignUp</Link>
        </li>
 
        
        <li className='nav-item'>
          <Link style={currenttab(history,"/signin")} className='nav-link' to={"/signin"}>SignIn</Link>
        </li>
        </Fragment>
       )}

       {isAuthenticated() && (
        <li className='nav-item'>
       <span className='nav-link  text-warning' onClick={()=>{
        signout(()=>{
          history.push("/")
        })
       }}>
        Signout
       </span>
        </li>
       )}

      </ul>
    </div>
)

export default withRouter(Menu);