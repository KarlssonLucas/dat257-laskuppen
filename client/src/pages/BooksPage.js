import React from 'react';
import "../css/bookspage.css";

export default class BooksPage extends React.Component {

    render() { 
        return (
            <div className="m-page-general-styling">
                <div className="m-page-header">
                    <h2> Böcker </h2> 
                </div>
                <div className="m-page-inner-container">
                    <div className="page-content">
                        Content
                    </div>
                </div>
            </div>
        )
    }
}