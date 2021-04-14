import React from 'react';


export default class ToplistCard extends React.Component {

    render() {
        return (
            <div className="card">
                <h1>{this.props.text}</h1>
                <hr></hr>
                <img src={this.props.src}/>
                DATA?
            </div>
        )
    }
}
