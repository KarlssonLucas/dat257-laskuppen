import './css/reviewlist.css';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const ReviewListComponent = (props) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async (str) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/reviews", requestOptions).then(response => response.json()).then(response => {
            console.log(response)
            setBooks(response);
        }
        );
    }

    const checkChecked = (book) => {
        if (book.accepted == true) {
            return "checked";
        } else {
            return "";
        }
    }

    const invertAcception = (book) => {
        //what to do here?
    }

    const showResult = (books) => {
        return (
            <div>
                {books.map((book) => {
                    return (
                        <div className="cbc-book">
                            <div className="rlc-book-title">title: {book.title}</div>
                            <div className="rlc-book-author">author: {book.writtenby}</div>
                            <div className="rlc-book-pages">pages: {book.pages}</div>
                            <div className="rlc-book-writtenby">writtenby: {book.writtenby}</div>
                            <div className="rlc-book-bookid">bookid: {book.bookid}</div>
                            <div className="rlc-book-reviewid">reviewid: {book.id}</div>
                            <div className="rlc-book-review">review: {book.summary}</div>
                            <div className="rlc-book-accepted" onClick={invertAcception(book)}>accepted: 
                                <label class="rlc-acc-checkbox">
                                    <input type="checkbox" checked={checkChecked(book)}/> 
                                </label>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }


    return (
        <div className="rlc-page-content">
            <div className="rlc-search-result">
                <div className="">Recensioner:</div>
                {showResult(books)}
            </div>
        </div>
    )
}

export default ReviewListComponent;
