import React from 'react'
import './dashboardStyles/dashboardNavbar.css'

import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
function DashboardNavbar() {
  return (
    <div className='navbar-container'>
        <div className='navbar-header'>
          <div>
          <p className='search-border'>Type to search<CiSearch className='search-icon'/></p>
          <div className='notification-bar'>
            <span className='right-content'>
              <IoIosNotificationsOutline className='notification-icon'/>
              <p>Katrina Monroe</p>
              <RxAvatar className='avatar-icon'/>
            </span>
            
          </div>
          {/* <div className='notification-bar'><RxAvatar className='notification-icon' /></div> */}
            </div>      
        </div>
    </div>
  )
}

export default DashboardNavbar