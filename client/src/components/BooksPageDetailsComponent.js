import './css/bookspagedetails.css';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                        <div className="review-container">
                            <div className="name">{review.name}</div>
                            <div className="review">{review.summary}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
        
    const history = useHistory();

    return (
        <div className="bpd-page-content">
            <div className="information">
                <FontAwesomeIcon className="backButton" icon={faTimes} color='black' onClick={() => history.push('/books')}/>
                <div className="title">Titel: {book.title}</div>
                <div className="author">Författare: {book.author}</div>
                <div className="pages">Sidantal: {book.pages}</div>
                <div className="image">
                    <img className="bpd-img" src={book.thumbnail} />
                </div>
                
            </div>
            <div className="description">{book.descr}</div>
            <div className="reviews"><h1>Recensioner:</h1>
                {reviewsToBook(reviews)}
            </div>
        </div>
    )
}

export default BooksPageDetailsComponent;
