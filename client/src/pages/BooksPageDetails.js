import React from "react";
import "./css/bookspagedetails.css";
import BooksPageDetailsComponent from '../components/BooksPageDetailsComponent';
import Select from 'react-select';

export default class BooksPageDetails extends React.Component {

    render() { 
        return (
            <div className="main-page-general-styling">
                <div className="main-page-header glassMorphism">
                    <h2> Böcker </h2>
                </div>
                <div className="main-page-inner-container">
                    <BooksPageDetailsComponent id={this.props.match.params.id} />
                </div>
            </div>
        );
    }
} 
