import fetch from 'node-fetch';
import React from 'react';
import "../css/faqpage.css";

export default class FAQPage extends React.Component {

    constructor(props){
        super(props);
        this.printQuestions = this.printQuestions.bind(this);
    }


    printQuestions = () => {
            let arr = [];
            for(let i=0; i< 50; i++){
                arr.push(
                <div className="faq-question">
                    <p>Q{i+1}: Vad får man poäng för? </p>
                </div>
            )
            }
            return arr;
        }
    

    render() {
        return (
            <div className="m-page-general-styling">
                <div className="m-page-header">
                    <h2> FAQ </h2>
                </div>
                <div className="m-page-inner-container">
                    <div className="faq-page-content">
                        {this.printQuestions()}
                    </div>
                </div>
            </div>
        )
    }
}