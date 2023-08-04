import React from 'react'
import {NavLink} from 'react-router-dom'
import NavData from '../data/NavData';

function NavBar() {

  const activeLink = "main-color font-700"

  const normalLink = "text-body-tertiary font-700"

  const titleStyle = {
    textDecoration: 'none',
  };

  return (
    <div className='tab-menu'>

      {
        NavData.map((item, index) => {
          return(
            <div key={index}>
              <NavLink to={item.path}
              style={titleStyle}
                className={({ isActive }) => isActive ? activeLink : normalLink}>
                <span className='centered fs-2'>{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            </div>
          )
        })
      }
    </div>
  )
}

export default NavBar
