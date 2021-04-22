import React from 'react';
import "./css/bookspage.css";

export default class BooksPage extends React.Component {

    render() { 
        return (
            <div className="main-page-general-styling">
                <div className="main-page-header">
                    <h2> Böcker </h2> 
                </div>
                <div className="main-page-inner-container">
                    <div className="bp-page-content">
                        Content
                    </div>
                </div>
            </div>
        )
    }
}
