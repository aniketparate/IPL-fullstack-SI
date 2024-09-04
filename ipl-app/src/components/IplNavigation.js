import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css'

const IplNavigation = () => {
  return <nav className='nav-bar'>
    <Link to='/'>Home</Link>
    <Link to='/getmatchstatistics'>Match Statistics</Link>
    <Link to='/gettopplayers'>Top Players</Link>
    <Link to='/matchdetails'>Match Details</Link>
    <Link to='/insertplayers'>Add Players</Link>
  </nav>
}

export default IplNavigation
