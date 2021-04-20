import '../css/choosebook.css';
import { useFormHook } from './useFormHook';
import React, { useState } from 'react';



const ChooseBookComponent = (props) => {

    var search;
    var fetching = false;

    const [books, setBooks] = useState([]);

    const fetchedBooks = async (str) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/books/".concat(str), requestOptions).then(response => response.json()).then(response => {
            console.log("SET BOOKS: ", response);
            setBooks(response);
        }
        );

        if (str != search) {
            fetchedBooks(search);
        } else {
            fetching = false;
        }


    }

    const updateSearch = event => {

        search = event.target.value;

        if (!fetching && event.target.value.length >= 5) {
            fetching = true;
            fetchedBooks(event.target.value);
        }

    };


    const showResult = (books) => {

      
        return (
            <div>

            {books.map((book) => {
                return (
                    <div className="cbc-book" onClick={() => {props.setBook(book)}}>
                    <div className="cbc-book-title">Titel: {book.title}</div>                
                    <div className="cbc-book-author">Författare: {book.authors}</div>                
                    <div className="cbc-book-pages">Sidor: {book.pageCount}</div>                
                    <div className="cbc-book-img">
                    <img src="https://www.asme.org/getmedia/c2c8ea5a-b690-4ba7-92bb-34bd1432862b/book_guide_hero_books.png?width=300&height=315&ext=.png" />                
                
                        </div> 
                    </div>
                )
            })}
        </div>
        )
    }


    return (
        <div className="cbc-page-container">
            <div className="cbc-search-book">
                <input
                    type="text"
                    id="header-text"
                    onChange={updateSearch}
                    placeholder="T.ex. Harry Potter och..."
                />
                {(books[0] == undefined) ? "No book" : JSON.stringify(books[0].title) + " " + JSON.stringify(books[0].authors) + " " + JSON.stringify(books[0].pageCount)}
            </div>

            <div className="cbc-search-result">
                {showResult(books)}
            </div>

            <div className="cbc-best-result">
asd
            </div>

            <div className="cbc-recent-result">
asd
            </div>


        </div>

    )
}


export default ChooseBookComponent;

