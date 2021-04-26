import fetch, { Body } from 'node-fetch';
import React from 'react';
import "./css/faqpage.css";

export default class FAQPage extends React.Component {

    constructor(props){
        super(props);
        this.printQuestions = this.printQuestions.bind(this);

        this.updateFAQ = this.updateFAQ.bind(this)
        this.addFAQ = this.addFAQ.bind(this)
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
            <div className="main-page-general-styling">
                <div className="main-page-header">
                    <h2> FAQ </h2>
                </div>
                <div className="main-page-inner-container">
                    <div className="main-page-content faq-page-content">
                        {this.printQuestions()}
                    </div>
                </div>
            </div>
        )
    }
}