import './css/bookspagedetails.css';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const BooksPageDetailsComponent = (props) => {
    const [book, setBook] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchBook();
        fetchReviews();
    }, []);

    const fetchBook = async (str) => {
    const requestOptions = {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
     };
     
    await fetch("/api/getbook/"+props.id, requestOptions).then(response => response.json()).then(response => {
        setBook(response[0])
        });
    } 

    const fetchReviews = async (str) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
    
        await fetch("/api/reviews/"+props.id, requestOptions).then(response => response.json()).then(response => {
            setReviews(response);
        });
    }

    const reviewsToBook = (reviews) => {
        return (
            <div>
                {reviews.map((review) => {
                    return (
                        <div className="bpd-book">
                            <div className="div20">{review.name}</div>
                            <div className="div10">{review.summary}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
        

    return (
        <div className="bpd-page-content">
            <div className="bpd-header">
                <div className="div1">Titel: {book.title}</div>
                <div className="div2">Författare: {book.author}</div>
                <div className="div3">Sidantal: {book.pages}</div>
                <div className="div4">
                    <img className="bpd-img" src={book.thumbnail} />
                </div>
            </div>
            <div className="bpd-review-result">
                {reviewsToBook(reviews)}
            </div>
        </div>
    )
}

export default BooksPageDetailsComponent;
