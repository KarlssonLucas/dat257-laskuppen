import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import "./css/faqadmin.css";
import FAQAdminQuestionComponent from './FAQAdminQuestionComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class FAQAdminComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { FAQs: null }
        this.printQuestions = this.printQuestions.bind(this);
        this.delFAQ = this.delFAQ.bind(this);
        this.addNewFAQ = this.addNewFAQ.bind(this);
        this.printQuestions();
    }


    delFAQ = (id) => {
        if (window.confirm("Är du säker?")) {
            let req = { method: "DELETE", headers: { "Content-Type": "application/json" } }
            fetch("/api/faq/" + id, req).then((response) => response.text())
                .then((response) => {
                    console.log(response);
                });
            this.printQuestions();
        }
    }




    addNewFAQ = () => {
        let req = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }
        fetch("/api/faq", req)
            .then((response) => response.text())
            .then((response) => {
                console.log(response);
            });
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
                        <FAQAdminQuestionComponent
                            onDelete={this.delFAQ}
                            id={faq.id}
                            question={faq.question}
                            answer={faq.answer}
                            onAdd={this.addFAQ} />
                    );
                }
                );
                console.log("STATE", FAQs)
                this.setState({ FAQs })
            });




    }

    render() {
        return (
            <div className="main-page-content faq-page-content">
                 <FontAwesomeIcon className="faq-admin-FAQ-add" onClick={() => { this.addNewFAQ() }} icon={faPlus} color='gray' />

                {this.state.FAQs}
            </div>
        )
    }
}
