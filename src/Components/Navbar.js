import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
      <>
    <Link className='navLink' to="/usestate">Using UseState</Link>
       <Link className='navLink' to="/context">Using Context </Link>
       <Link className='navLink' to="/redux">Using Redux</Link>
       </>
  )
}

export default Navbar