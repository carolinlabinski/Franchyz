import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {useSelector } from 'react-redux'
import Portrait from './portrait.jsx'
import '../../styles/nav.scss'



function Navbar(){

  const [authNav, setAuthNav] = useState('')
  const isAuth = useSelector(state => state.authReducer.isAuth)

  function test() {

  }

  useEffect(inOrOut,[])


  function inOrOut(){
    let ans
    if (!isAuth) {
      ans = (
      <>
        <Link to="/register"><button type="button" className="btn btn-sm btn-primary"> Register </button> </Link>
        <Link to="/login"><button type="button" className="btn btn-sm btn-primary"> login </button> </Link>
      </>
      )
    } else {
      ans =  (
        <Portrait />
      )
    }
    return ans
  }

  return(
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav d-flex">
          <li className="">
            <Link to="/" className="logo">FRANCHYZ</Link>
          </li>
          <li className="nav-item active">
            <Link to="/dashboardAdmin"> My Dashboard </Link>
          </li>
        </ul>
        <div id='authNav'>
          {authNav}
        </div>
      </nav>
    </>
  )
}
export default Navbar
