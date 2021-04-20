import React from 'react';
import MakeReviewComponent from '../components/makereview';
import ChooseBookComponent from '../components/ChooseBookComponent';

export default class MakeReviewPage extends React.Component {

    constructor() {
        super();
        this.state = { book: null };
        this.setBook = this.setBook.bind(this);
        console.log(this.state.book == null);
    }

    setBook(book){
        console.log("SET BOOK PAGE",this.state.book == null)
        this.setState({book:book});
    }

    render() {
        return (
            <div className="m-page-general-styling">
            <div className="m-page-header">
                <h2> {(this.state.book == null) ? "Välj bok" : "Skriv Recension"} </h2> 
            </div>
            <div className="m-page-inner-container">
                {(this.state.book == null) ? <ChooseBookComponent setBook={this.setBook}/> : <MakeReviewComponent book={this.state.book}/>}
            </div>
        </div>
        )
    }
}
