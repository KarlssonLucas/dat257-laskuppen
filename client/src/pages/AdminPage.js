import React from 'react';
import "./css/adminpage.css";
import ReviewListComponent from '../components/ReviewListComponent';

export default class AdminPage extends React.Component {

    render() { 
        return (
            <div className="main-page-general-styling">
                <div className="main-page-header">
                    <h2> Admin </h2> 
                </div>
                <div className="main-page-inner-container">
                    <ReviewListComponent></ReviewListComponent> 
                </div>
            </div>
        )
    }
}
