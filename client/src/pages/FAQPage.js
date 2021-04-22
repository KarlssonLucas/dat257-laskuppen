import fetch from 'node-fetch';
import React from 'react';
import FAQCardComponent from '../components/FAQCardComponent';
import "./css/faqpage.css";

export default class FAQPage extends React.Component {

    constructor(props) {
        super(props);
        this.printQuestions = this.printQuestions.bind(this);
    }


    printQuestions = () => {
        let arr = [];
        for (let i = 0; i < 50; i++) {
            arr.push(
                <FAQCardComponent question="Q1:" answer="A1:" />
            )
        }
        return arr;
    }


    render() {
        return (
            <div className="main-page-general-styling">
                <div className="main-page-header">
                    <h2> FAQ </h2>
                </div>
                <div className="main-page-inner-container">
                    <div className="faq-page-content">
                        {this.printQuestions()}
                    </div>
                </div>
            </div>
        )
    }
}