import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { faTrophy, faAward, faBook, faGraduationCap, faHome, faPenNib, faQuestionCircle, faUser, faUserShield, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/sidebar.css';
import fetch from 'node-fetch';
import { useMediaQuery } from 'react-responsive'
import SidebarSmall from './SidebarSmall';
import SidebarBig from './SidebarBig';

const Sidebar = (props) => {

    const [session, setSession] = useState(null);
    const [sidebarData, setSidebarData] = useState([]);

    const small = useMediaQuery({ minWidth: 801 })
    const medium = useMediaQuery({ minWidth: 1101 })
    const big = useMediaQuery({ minWidth: 1401 })



    useEffect(() => {

        fetch("/api/session").then(response => response.json()).then(response => {

            var sidebarData = [{
                title: "Logga in",
                path: "/login",
                icon: <FontAwesomeIcon icon={faSignInAlt} color='white' />
            }];
            setSession(response)

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

            setSidebarData(sidebarData);

        })


    }, []);


    function sidebar() {
        if (big)
            return <SidebarBig sidebarData={sidebarData} session={session} />
        else
            return <SidebarSmall sidebarData={sidebarData} session={session} />
    }



    return (
        sidebar()
    )
}


export default Sidebar;
