import React from 'react'
import Sidebar from '../components/Sidebar'
import styles from './AppLayout.module.css'
import Map from '../components/Map'
import User from '../components/User'
import { useAuth } from '../contexts/FakeAuthcontext'




const AppLayout = () => {
  const {isAuthenticated}=useAuth();
  return (
    <div className={styles.app}>
     <Sidebar/>
     <Map/>
      {isAuthenticated && <User/>}
    </div>
  )
}

export default AppLayout
