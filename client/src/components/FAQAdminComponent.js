import React from 'react';
import "./css/faqadmin.css";
import FAQAdminQuestionComponent from './FAQAdminQuestionComponent';

export default class FAQAdminComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { FAQs: null }
        this.printQuestions = this.printQuestions.bind(this);
        this.delFAQ = this.delFAQ.bind(this);
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

    updateFAQ = () => {
        let req = { method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: 1 , question: "hej", answer: "coolt"})

        }
        fetch("/api/faq",req)
          .then((response) => response.text())
          .then((response) => {
            console.log(response);
          });
      }


      addFAQ = () => {
        let req = { method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({question: "New q", answer: "new a"})
        }
        fetch("/api/faq",req)
          .then((response) => response.text())
          .then((response) => {
            console.log(response);
          });
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
            <div className="main-page-content faq-page-content">
                {this.state.FAQs}
            </div>
        )
    }
}
