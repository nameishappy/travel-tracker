import React from 'react'
import AppNav from "./AppNav"
import Logo from './Logo'
import styles from "./Sidebar.module.css"
import { Outlet } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <Logo/>
        <AppNav/>
        <Outlet/>
        
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by WorldWise corp
            </p>
        </footer>
      
    </div>
  )
}

export default Sidebar
