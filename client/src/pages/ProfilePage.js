import React from 'react';
import "./css/profilepage.css";

export default class ProfilePage extends React.Component {

    render() { 
        return (
            <div className="main-page-general-styling">
                <div className="main-page-header">
                    <h2> Profil </h2> 
                </div>
                <div className="main-page-inner-container">
                    <div className="pp-page-content">
                        Content
                    </div>
                </div>
            </div>
        )
    }
}
