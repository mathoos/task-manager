import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../img/logo.svg";
import IconDashboard from "../img/icons/icon-list.svg";
import IconCalendar from "../img/icons/icon-calendar.svg";
import Iconlogout from "../img/icons/icon-logout.svg";
import './Nav.scss';

const Nav = () => {

    return(           
        <nav className="nav">
           
           <Link to="/" className="nav_logo">
                <img src={Logo} alt="Logo Task Manager"/>
            </Link>
            
            <div className="nav_links">
                <Link to="" className="nav_links-link">
                    <img src={IconDashboard} alt="Logo"/>
                    <p>Dashboard</p>
                </Link>
                <Link to="" className="nav_links-link">
                    <img src={IconCalendar} alt="Logo"/>
                    <p>Calendar</p>
                </Link>
            </div>
            <div className="nav_parameters">
                <a href="" className="nav_parameters-link">
                    <img src={Iconlogout} alt="Logo"/>
                    <p>Logout</p>
                </a>
            </div>
        </nav>   
    )
}


export default Nav;