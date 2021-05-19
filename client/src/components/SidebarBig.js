import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/sidebar.css';


const SidebarBig = (props) => {


    return (
        <div className="main-sidebar-container">
            <div className="sidebar-menu glassMorphism">
                {(props.sidebarData.length === 1) ? <Redirect to="/login" /> : ""}
                <h1 className='sidebar-logo'>
                    <FontAwesomeIcon icon={faTrophy} color='white' size='lg' />
                    Läskuppen
            </h1>

                <ul className="sidebar-menu-items">

                    {(props.session && props.session.login != false) ?
                        <div>
                            <li className="sidebar-item">

                                <Link to="/profile">
                                    <div className="sidebar-link">
                                        <FontAwesomeIcon icon={faUser} color='white' size='lg' />
                                        {props.session.name}
                                    </div>
                                </Link>
                            </li>
                            <hr />
                        </div>
                        : ""}

                    {props.sidebarData.map((item, index) => {
                        return (
                            <li key={index} className="sidebar-item">
                                <Link to={item.path}>
                                    <div className="sidebar-link">
                                        {item.icon}
                                        <span className="sidebar-link-text">
                                            {item.title}
                                        </span>
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


export default SidebarBig;