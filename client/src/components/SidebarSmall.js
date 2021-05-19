import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { faTrophy, faAward, faBook, faGraduationCap, faHome, faPenNib, faQuestionCircle, faUser, faUserShield, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/sidebar.css';
import fetch from 'node-fetch';
import { useMediaQuery } from 'react-responsive'


const SidebarSmall = (props) => {


    return (
        <div className="main-sidebar-container">

            <div className="sidebar-menu-small glassMorphism">
                {(props.sidebarData.length === 1) ? <Redirect to="/login" /> : ""}
                <h1 className='sidebar-logo-small'>
                    <FontAwesomeIcon icon={faTrophy} color='white' size='lg' />
                </h1>

                <ul className="sidebar-menu-items">

                    {(props.session && props.session.login != false) ?
                        <div>
                            <li style={{maxHeight:"53px"}} className="sidebar-item">

                                <Link to="/profile">
                                    <div className="sidebar-link-small">
                                        <FontAwesomeIcon icon={faUser} color='white' size='lg' />
                                    </div>
                                </Link>
                            </li>
                        </div>
                        : ""}

                    {props.sidebarData.map((item, index) => {
                        return (
                            <li key={index} style={{maxHeight:"53px"}} className="sidebar-item">
                                <Link to={item.path}>
                                    <div className="sidebar-link-small">
                                        {item.icon}
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>

    )

}


export default SidebarSmall;