import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class FAQAdminQuestionComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question: <p>{props.question}</p>,
            answer: <p>{props.answer}</p>
        }
        this.edit = this.edit.bind(this);
    }


    edit(){
        this.setState({
            question: <input value={this.props.question}/>,
            answer: <input value={this.props.answer}/>
        });
    }

    render() {
        return (
            <div className="faq-admin-FAQ">
                <div className="faq-admin-FAQ-text">
                    {this.state.question}
                    <br/>
                    {this.state.answer}
                </div>
                <div className="faq-admin-FAQ-buttons">
                    <FontAwesomeIcon onClick={() => { this.props.onDelete(this.props.id) }} icon={faTrash} color='gray' />
                    <FontAwesomeIcon onClick={() => { this.edit() }} icon={faEdit} color='gray' />
                </div>
            </div>
        )
    }
}


