import React from 'react';

export default class FAQCardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { expand: null }
        this.expand = this.expand.bind(this);
    }

    expand() {

        var expand = this.expand;

        if (this.state.expand = null) {
            this.state.expand = expand;

        } else {
            expand = null;
        }

        console.log("test");
    }

    render() {
        const { expand } = this.state;
        return (
            <div>
                <div className="faq-question" onClick={() => this.setState(
                    { expand: !expand })}> {this.props.question}


                    {expand
                        ? <div className="faq-answer">
                            {this.props.answer}
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}
