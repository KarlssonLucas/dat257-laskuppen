import React from 'react';
import { Link } from "react-router-dom";
import { faTrophy,faAward, faBook, faGraduationCap, faHome, faPenNib, faQuestionCircle, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/sidebar.css';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarData:
                [
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
                        title: "Profil",
                        path: "/profile",
                        icon: <FontAwesomeIcon icon={faUser} color='white' size='lg' />
                    },
                    {
                        title: "FAQ",
                        path: "/faq",
                        icon: <FontAwesomeIcon icon={faQuestionCircle} color='white' size='lg' />
                    },
                    {
                        title: "Lärare",
                        path: "/teacher",
                        icon: <FontAwesomeIcon icon={faGraduationCap} color='green' size='lg' />
                    },
                    {
                        title: "Admin",
                        path: "/admin",
                        icon: <FontAwesomeIcon icon={faUserShield} color='red' size='lg' />
                    }
                ]
        };
    }

    render() {
        return (
            <div className="sidebar-menu">             
                <h1 className='sidebar-logo'> <FontAwesomeIcon icon={faTrophy} color='white' size='lg' />Läskuppen </h1>
                <ul className="sidebar-menu-items">
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
