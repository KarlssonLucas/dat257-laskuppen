import React from 'react';
import "../css/toplistpage.css";
import ToplistCard from "../components/ToplistCard";

export default class ToplistPage extends React.Component {


    constructor(){
        super();
        this.state = {data: null}
        this.getData = this.getData.bind(this);
        this.getData();
    }


    getData(){
        if(this.state.data == null){
            fetch('/api/users')
            .then(response => response.json())
            .then(transaction => {
                this.setState({data:transaction});
            });
        }
            
    }


    render() {
        
        return (
            <div>
                <div className="page-name">Topplista</div>
                <div className="page-content">
                    <div className="card-container">
                        <ToplistCard text="kort 1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Open_book_nae_02.svg/375px-Open_book_nae_02.svg.png"/>
                        <ToplistCard text="kort 2" src="https://specials-images.forbesimg.com/imageserve/5f85be4ed0acaafe77436710/960x0.jpg?fit=scale"/>
                        <ToplistCard text="kort 3" src=""/>
                        <ToplistCard text="kort 4" src=""/>
                    </div>
                    {(this.state.data == null) ? "No data" : JSON.stringify(this.state.data)}
                </div>
            </div>
        )
    }
}
