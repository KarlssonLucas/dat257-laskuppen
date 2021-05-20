import './css/reviewlist.css';
import React, { useState, useEffect } from 'react';
import Accordion from "./Accordion";
import { useMediaQuery } from 'react-responsive';

const ReviewListComponent = (props) => {
    const [books, setBooks] = useState([]);
    const pendAccepting = [];

    const big = useMediaQuery({minWidth: 1401})
    const medium = useMediaQuery({ minWidth: 1101 })
    const small = useMediaQuery({ minWidth: 801 })

    useEffect(() => {
        fetchReviews();
    }, []);

    // Fetches all the reviews
    const fetchReviews = async (str) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/reviews", requestOptions).then(response => response.json()).then(response => {
            setBooks(response);
        });
    }

    // Accepts the book in the pendaccepting list
    const acceptBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/accrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
        setBooks([])
        fetchReviews()
    }

    // Rejects the books in the pendaccepting list
    const rejectBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/rejrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
        setBooks([])
        fetchReviews()
    }

    // Publishes the books in the pendaccepting list
    const publishBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/pubrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
        setBooks([])
        fetchReviews()
    }

    // Unpublishes the books in the pendaccepting list
    const unpublishBooks =  () => {
        pendAccepting.map((item) => (
            fetch("/api/unpubrev/"+item.rid).then(response => response.json()).then(response => {
                console.log(response)
            })
        ))
        setBooks([])
        fetchReviews()
    }

    // Adds a book to the list but if its in there, remove it
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

    // Deletes a review
    const deleteBook = (book) => {
        if (window.confirm("Är du säker?")) {
            let req = { method: "DELETE", headers: { "Content-Type": "application/json" } }
            fetch("/api/deletereview/" + book.rid, req).then((response) => response.text())
                .then((response) => {
                    console.log(response);
                });
            fetchReviews()
        }
    }

    // Give bonus points to the users in the pendaccepting list
    const bonusPoints = event => {
        const points = parseInt(document.getElementById("inputBonus").value);
        const alegibleForPoints = ([])

        pendAccepting.map((item) => (
            alegibleForPoints.push(item.uid)
        ))

        const uniquePoints = Array.from(new Set(alegibleForPoints))

        uniquePoints.map((item) => (
                fetch("/api/bonus?id="+item+"&points="+points).then(response => response.json()).then(response => {
                    console.log(response)
                })
        ))
        setBooks([])
        fetchReviews()
    }
    
    // Check if a book is accepted or not to display it
    const checkAcc = (b, e) => {
        if (b.accepted) {
            return "accepted"
        } else {
            return "not accepted"
        }
    }

    // Check if a book is published or not to display it
    const checkPub = (b) => {
        if (b.published) {
            return "published"
        } else {
            return "not published"
        }
    }

    // Checks if the paragraph container should be green or red
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

    // Creates a box to display the reviews and their information
    const showResult = (books) => {
        return (
            <div className="">
                {books.map((book) => {
                    return (

                        <Accordion
                            checkbutton= {
                                <div className="rlc-mul"> 
                                    <label className="rlc-acc-checkbox">
                                        <input className="rlc-checkb" name="foo" type="checkbox" onChange={(e) => addBook(book, e)}/> 
                                    </label>
                                </div>
                            }

                            title={
                            <div className="rlc-book"> 
                                <div className="rlc-book-title">Titel: {book.title}</div>
                                {small ? <div className="rlc-book-writtenby">Författare: {book.author}</div> : "" }
                                <div className="rlc-book-pages">Sidor: {book.pages}</div>
                                <div className="rlc-book-author">Recensent: {book.name}</div>
                                {small ? <div className="rlc-book-bookid">Book ID: {book.bookid}</div> : "" }
                                {small ? <div className="rlc-book-reviewid">Recension ID: {book.rid}</div> : ""}
                                <div className={greenOrRed(book, "acc")}>{checkAcc(book)}</div>
                                <div className={greenOrRed(book, "pub")}>{checkPub(book)}</div>
                            </div>}
                            
                            content={book.summary}
                        />
                    )
                })} 
            </div>
        )
    }

    // Click the checkboxes when you markall
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
                <button type="button" onClick={() => acceptBooks()}>Acceptera</button>
                <button type="button" onClick={() => rejectBooks()}>Avslå</button>
            </div>
            <div>
                <button type="button" onClick={() => publishBooks()}>Publicera</button>
                <button type="button" onClick={() => unpublishBooks()}>Avpublicera</button>
            </div>
            <div>
                <button type="button" onClick={() => toggle()}>Markera alla</button>
            </div>
            <div className="rlc-bonusfield">
                <input
                className="rlc-field"
                type="text"
                placeholder="Poäng..."
                id="inputBonus"
            />
                <button type="button" onClick={bonusPoints}>Ge bonuspoäng</button>
            </div>
        </div>
    )
}

export default ReviewListComponent;
