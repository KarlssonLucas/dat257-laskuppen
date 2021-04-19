import React from 'react';
import { Link } from "react-router-dom";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import '../css/sidebar.css';


export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarData:
                [
                    {
                        title: "Topplista",
                        path: "/toplist",
                        icon: <FontAwesomeIcon icon={faHome} color='white' size='lg' />,
                        cName: "nav-text"
                    },
                    {
                        title: "Skriv Recension",
                        path: "/makereview",
                        icon: <FontAwesomeIcon icon={faHome} color='white' size='lg' />,
                        cName: "nav-text"
                    },
                    {
                        title: "Böcker",
                        path: "/books",
                        icon: <FontAwesomeIcon icon={faHome} color='white' size='lg' />,
                        cName: "nav-text"
                    },
                    {
                        title: "FAQ",
                        path: "/faq",
                        icon: <FontAwesomeIcon icon={faHome} color='white' size='lg' />,
                        cName: "nav-text"
                    }
                ]
        };
    }

    render() {        
        return (
            <nav className={'nav-menu'}>
                <h1 className='logo'> Laskuppen </h1>
                <ul className="nav-menu-items">
                    {this.state.sidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span className="nav-menu-item-title">
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}
