import React from 'react'
import { isMobile } from 'react-device-detect';

import {Link, NavLink} from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
        <div className="container">
            <ul className="navbar-nav d-flex justify-content-around" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}
                  aria-current="page"
                  to="/main">
                  Main</NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}
                  aria-current="page"
                  to="/hub">
                  Hub</NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}
                  aria-current="page"
                  to="/routine">
                  Routine</NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}
                  aria-current="page"
                  to="/setting">
                  Setting</NavLink>
              </li>
            </ul>
        </div>
      </nav>
  )
}

export default NavBar