import './css/reviewlist.css';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const ReviewListComponent = (props) => {
    const [books, setBooks] = useState([]);
    const pendAccepting = [];

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

    const acceptBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/accrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
    }

    const rejectBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/rejrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
    }

    const publishBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/pubrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
    }

    const unpublishBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/unpubrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
    }

    const clearSelection =  () => {
       pendAccepting.length = 0
    }

    const addBook = (book, e) => {
        console.log(e.target.checked)
        if(e.target.checked) {
            pendAccepting.push(book)
        } else {
            const index = pendAccepting.indexOf(book);
            if (index > -1) {
              pendAccepting.splice(index, 1);
            }
        }
    }

    const showResult = (books) => {
        return (
            <div>
                {books.map((book) => {
                    return (
                        <div className="cbc-book">
                            <div className="rlc-mul"> 
                                <label class="rlc-acc-checkbox">
                                    <input type="checkbox" onChange={(e) => addBook(book, e)}/> 
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
                                    <input type="checkbox" checked={book.accepted}/> 
                                </label>
                            </div>
                            <div className="rlc-book-published">published: 
                                <label className="rlc-acc-checkbox">
                                    <input type="checkbox" checked={book.published}/> 
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
                <button type="button" onClick={() => acceptBooks()}>accept</button>
                <button type="button" onClick={() => rejectBooks()}>reject</button>
            </div>
            <div>
                <button type="button" onClick={() => publishBooks()}>publish</button>
                <button type="button" onClick={() => unpublishBooks()}>unpublish</button>
            </div>
            <div>
                <button type="button" onClick={() => clearSelection()}>clear</button>
            </div>
        </div>
    )
}

export default ReviewListComponent;
