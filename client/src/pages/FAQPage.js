import React from 'react';
import "../css/faqpage.css";

export default class FAQPage extends React.Component {

    render() {
        return (
            <div className="m-page-general-styling">
                <div className="m-page-header">
                    <h2> FAQ </h2>
                </div>
                <div className="m-page-inner-container">
                    <div className="faq-page-content">

                        <div className="faq-question1">
                            <p > Vad får man poäng för? </p>
                        </div>

                        <div className="faq-question2">
                            Vad får man poäng för?
                        </div>

                        <div className="faq-question3">
                            Vad får man poäng för?
                        </div>

                        <div className="faq-question4">
                            Vad får man poäng för?
                        </div>

                        <div className="faq-question5">
                            Vad får man poäng för?
                        </div>

                        <div className="faq-question6">
                            Vad får man poäng för?
                        </div>

                        <div className="faq-question7">
                            Vad får man poäng för?
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}