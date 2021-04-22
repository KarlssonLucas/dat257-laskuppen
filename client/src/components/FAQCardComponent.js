import React from 'react';

export default class FAQCardComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
        this.method = this.method.bind(this);
    }

    method(){

    }

    render() { 
        return (
            <div className="faq-question">
                {this.props.question}
            </div>
        )
    }
}
