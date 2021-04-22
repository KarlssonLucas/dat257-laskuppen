import './css/reviewlist.css';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const ReviewListComponent = (props) => {
    const [books, setBooks] = useState([]);
    const [pendAccepting, setPendAccepting] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async (str) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/reviews", requestOptions).then(response => response.json()).then(response => {
            setBooks(response);
        });
    }

    const checkChecked = (book) => {
        if (book.accepted == true) {
            return "checked";
        } else {
            return "";
        }
    }

    const acceptBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/accrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
    }

    const showResult = (books) => {
        return (
            <div>
                {books.map((book) => {
                    return (
                        <div className="cbc-book">
                            <div className="rlc-mul"> 
                                <label class="rlc-acc-checkbox" onChange={() => setPendAccepting(oldArray => [...oldArray, book])}>
                                    <input type="checkbox"/> 
                                </label>
                            </div>
                            <div className="rlc-book-title">title: {book.title}</div>
                            <div className="rlc-book-author">author: {book.author}</div>
                            <div className="rlc-book-pages">pages: {book.pages}</div>
                            <div className="rlc-book-writtenby">writtenby: {book.writtenby}</div>
                            <div className="rlc-book-bookid">bookid: {book.bookid}</div>
                            <div className="rlc-book-reviewid">reviewid: {book.rid}</div>
                            <div className="rlc-book-review">review: {book.summary}</div>
                            <div className="rlc-book-accepted">accepted: 
                                <label className="rlc-acc-checkbox">
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
            <div>
                <button type="button" onClick={acceptBooks()}>accpet</button>
            </div>
        </div>
    )
}

export default ReviewListComponent;
