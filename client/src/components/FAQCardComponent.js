import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';




export default class FAQCardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { expand: null }
        this.expand = this.expand.bind(this);
    }

    expand() {

        console.log("test");
    }

    render() {
        const { expand } = this.state;
        const triangle = <FontAwesomeIcon icon={expand ? faCaretDown : faCaretUp} />;
        return (
            <div>

                <div className="faq-card glassMorphism" onClick={() => this.setState({ expand: !expand })}>
                    
                   
                    <div className="faq-question">
                        <div className="tri">
                            {triangle}
                        </div>
                        <p>{this.props.question} </p>
                    </div>

                    
                    {expand
                        ? <div className="faq-answer">
                            <p> Svar: {this.props.answer} </p>


                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}
