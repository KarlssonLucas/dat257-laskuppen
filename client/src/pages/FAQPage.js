import React from 'react';
import FAQCardComponent from '../components/FAQCardComponent';
import "./css/faqpage.css";

export default class FAQPage extends React.Component {

    constructor(props) {
        super(props);
        this.printQuestions = this.printQuestions.bind(this);
        this.state = { FAQs: null }
        this.printQuestions();

    }

    printQuestions = () => {
        let FAQs = [];

        fetch("/api/faq")
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                response.map((faq) => {
                    FAQs.push(
                        <FAQCardComponent
                            question={faq.question}
                            answer={faq.answer} />
                    );
                }
                );
                console.log("STATE", FAQs)
                this.setState({ FAQs })
            });


    }


    render() {
        return (
            <div className="main-page-general-styling">
                <div className="main-page-header glassMorphism">
                    <h2> FAQ </h2>
                </div>
                <div className="main-page-inner-container">
                    <div className="main-page-content faq-page-content glassMorphism">
                        {this.state.FAQs}
                    </div>
                </div>
            </div>
        )
    }
}