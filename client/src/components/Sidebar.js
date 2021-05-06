import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { faTrophy, faAward, faBook, faGraduationCap, faHome, faPenNib, faQuestionCircle, faUser, faUserShield, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/sidebar.css';
import fetch from 'node-fetch';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sidebarData: [],
            session: null
        };
    }


    componentDidMount() {
        fetch("/api/session").then(response => response.json()).then(response => {

            var sidebarData = [{
                title: "Logga in",
                path: "/login",
                icon: <FontAwesomeIcon icon={faSignInAlt} color='white' />
            }];
            this.setState({ session: response })

            if (response.role > 0) {
                sidebarData = [];
                sidebarData.push(
                    {
                        title: "Topplista",
                        path: "/toplist",
                        icon: <FontAwesomeIcon icon={faAward} color='white' />
                    },
                    {
                        title: "Recensera",
                        path: "/makereview",
                        icon: <FontAwesomeIcon icon={faPenNib} color='white' />
                    },
                    {
                        title: "Böcker",
                        path: "/books",
                        icon: <FontAwesomeIcon icon={faBook} color='white' />
                    },
                    {
                        title: "FAQ",
                        path: "/faq",
                        icon: <FontAwesomeIcon icon={faQuestionCircle} color='white' size='lg' />
                    });
            }

            if (response.role > 1) {
                sidebarData.push({
                    title: "Lärare",
                    path: "/teacher",
                    icon: <FontAwesomeIcon icon={faGraduationCap} color='green' size='lg' />
                })
            }

            if (response.role > 2) {
                sidebarData.push({
                    title: "Admin",
                    path: "/admin",
                    icon: <FontAwesomeIcon icon={faUserShield} color='red' size='lg' />
                });
            }

            if (response.role > 0) {
                sidebarData.push({
                    title: "Logga ut",
                    path: "/logout",
                    icon: <FontAwesomeIcon icon={faSignOutAlt} color='white' size='lg' />
                });
            }

            this.setState({ sidebarData });

        })


    }

    render() {
        return (
            <div className="sidebar-menu">
                {(this.state.sidebarData.length === 1) ? <Redirect to="/login" /> : ""}
                <h1 className='sidebar-logo'> <FontAwesomeIcon icon={faTrophy} color='white' size='lg' />Läskuppen </h1>

                <ul className="sidebar-menu-items">

                    {(this.state.session && this.state.session.login != false) ? 
                    <div>
                    <li className="sidebar-item">
                        
                        <Link to="/profile">
                            <div className="sidebar-link">
                                <FontAwesomeIcon icon={faUser} color='white' size='lg' />
                                <span className="sidebar-link-text">
                                    {this.state.session.name}
                                </span>
                            </div>
                        </Link>
                        
                    </li>
                    <hr/>
                    </div>
:""}

                    {this.state.sidebarData.map((item, index) => {
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
        )
    }
}
