import React from 'react'
import styles from './AppNav.module.css'
import { Link, NavLink } from 'react-router-dom'

const AppNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities" >cities</NavLink>
        </li>
        <li>
          <NavLink to="countries" >Countries</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AppNav