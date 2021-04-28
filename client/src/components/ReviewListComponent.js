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
        setBooks([])
        fetchReviews()
    }

    const rejectBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/rejrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
        setBooks([])
        fetchReviews()
    }

    const publishBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/pubrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
        setBooks([])
        fetchReviews()
    }

    const unpublishBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/unpubrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
        setBooks([])
        fetchReviews()
    }

    const giveBonusPoints = (points) => {
         pendAccepting.map((item) => (
            fetch("/api/bonus/"+item.rid+"/"+points).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
        setBooks([])
        fetchReviews()
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
    
    const checkAcc = (b, e) => {
        if (b.accepted) {
            return "accepted"
        } else {
            return "not accepted"
        }
    }

    const checkPub = (b) => {
        if (b.published) {
            return "published"
        } else {
            return "not published"
        }
    }

    const greenOrRed = (b, s) => {
        if (s == "pub") {
            if (b.published) {
                return "rlc-book-published"
            } else {
                return "rlc-book-notpublished"
            }
        } else {
            if (b.accepted) {
                return "rlc-book-accepted"
            } else {
                return "rlc-book-notaccepted"
            }
        }
    }

    const showResult = (books) => {
        return (
            <div>
                {books.map((book) => {
                    return (
                        <div className="rlc-book">
                            <div className="rlc-mul"> 
                                <label className="rlc-acc-checkbox">
                                    <input className="rlc-checkb" name="foo" type="checkbox" onChange={(e) => addBook(book, e)}/> 
                                </label>
                            </div>
                            <div className="rlc-book-title">title: {book.title}</div>
                            <div className="rlc-book-author">author: {book.author}</div>
                            <div className="rlc-book-pages">pages: {book.pages}</div>
                            <div className="rlc-book-writtenby">writtenby: {book.name}</div>
                            <div className="rlc-book-bookid">bookid: {book.bookid}</div>
                            <div className="rlc-book-reviewid">reviewid: {book.rid}</div>
                            <div className="rlc-book-review">review: {book.summary}</div>
                            <div className={greenOrRed(book, "acc")}>{checkAcc(book)}</div>
                            <div className={greenOrRed(book, "pub")}>{checkPub(book)}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    function toggle() {
        const checkboxes = document.getElementsByName('foo');
        for(var i=0, n=checkboxes.length;i<n;i++) {
            checkboxes[i].click()
        }
        console.log(checkboxes)
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
                <button type="button" onClick={() => toggle()}>Mark All</button>
            </div>
        </div>
    )
}

export default ReviewListComponent;
