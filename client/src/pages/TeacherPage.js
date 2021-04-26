import React from 'react';
import "./css/teacherpage.css";
import FAQAdminComponent from '../components/FAQAdminComponent';

export default class TeacherPage extends React.Component {

    render() {
        return (
            <div className="main-page-general-styling">
                <div className="main-page-header">
                    <h2> Lärare </h2>
                </div>
                <div className="main-page-inner-container">
                    <div className="main-page-content tp-page-content">
                        <FAQAdminComponent />
                    </div>
                </div>
            </div>
        )
    }
}
