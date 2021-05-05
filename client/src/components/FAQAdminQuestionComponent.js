import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';


const FAQAdminQuestionComponent = (props) => {

    const [answer, setAnswer] = useState(props.answer);
    const [question, setQuestion] = useState(props.question);

    const [hasChanged, setChanged] = useState(false);

    const updateFAQ = (id) => {
        setChanged(false);
        let req = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, question, answer })
        }
        fetch("/api/faq", req)
            .then((response) => response.text())
            .then((response) => {
                console.log(response);
            });
    }

    return (
        <div className="faq-admin-FAQ">
            <div className="faq-admin-FAQ-text">

                <input className={(hasChanged) ? "faq-admin-FAQ-changed" : "faq-admin-FAQ-saved" } value={question} type="text" name="question" onChange={(e) => {
                    setQuestion(e.target.value)
                    setChanged(true);
                }} />
                <br />
                <input className={(hasChanged) ? "faq-admin-FAQ-changed" : "faq-admin-FAQ-saved" } value={answer} type="text" name="answer" onChange={(e) => {
                    setAnswer(e.target.value)
                    setChanged(true);
                }} />
            </div>
            <div className="faq-admin-FAQ-buttons">
                <FontAwesomeIcon className="faq-admin-FAQ-trash" onClick={() => { props.onDelete(props.id) }} icon={faTrash} color='gray' />
                <FontAwesomeIcon className="faq-admin-FAQ-save" onClick={() => { updateFAQ(props.id) }} icon={faSave} color='gray' />
            </div>
        </div>
    )

}


export default FAQAdminQuestionComponent;
