import './css/archive.css';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import {useHistory} from 'react-router-dom';

const ArchiveComponent = (props) => {



    const big = useMediaQuery({ minWidth: 1401 })
    const medium = useMediaQuery({ minWidth: 1101 })
    const small = useMediaQuery({ minWidth: 801 })

    const [book, setBook] = useState({});
    const [reviews, setReviews] = useState([]);


    const history = useHistory();

    useEffect(() => {
        fetchReviews();
    }, []);

    // Fetch the reviews connected to a user
    const fetchReviews = async (str) => {
        await fetch("/api/user/reviews").then(response => response.json()).then(response => {
            setReviews(response);
        });
    }

    // Gets the status of the review
    const getStatus = (review) => {
        if (review.status === 4) {
            return "Publicerad"
        }
        else if (review.status === 3) {
            return "Godkänd"
        }
        else if (review.status === 2) {
            return "Ej behandlad"
        }
        else {
            return "Nekad"
        }
    }

    function parseAuthors(authors) {
        var res = "";

        JSON.parse(authors).forEach(author => res += author + ", ");

        return res.slice(0, -2)
    }


    // The review container that is displayed on the page
    const reviewsToBook = (reviews) => {
        return (
            <div>
                {reviews.map((review) => {
                    return (
                        <div className="arc-review-container glassMorphism" onClick={() => history.push('/books/' + review.bookid)}>
                            <div className="arc-review-img">
                                <img src={review.thumbnail} />
                            </div>
                            <div className="arc-review-info2">
                                <p><b>Betyg:</b> {review.rating}</p>
                                <p><b>Läsvärd:</b> {(review.worthreading === true) ? "Ja" : "Nej"}</p>
                                <p><b>Status:</b> <span className={"status-"+review.status}>{getStatus(review)}</span></p>
                            </div>
                            {small ?
                                <div className="arc-review-text">
                                    <p><b>Recension:</b></p>
                                    <p>{review.summary}</p>
                                </div>
                                : ""}
                            {medium ?
                                <div className="arc-review-info">
                                    <p><b>Titel:</b> {review.title}</p>
                                    <p><b>Författare:</b> {parseAuthors(review.author)}</p>
                                    <p><b>Sidor:</b> {review.pages}</p>
                                </div>
                                : ""}

                        </div>
                    )
                })}
            </div>
        )
    }


    return (
        <div className="arc-page-content">
            {reviewsToBook(reviews)}
        </div>
    )
}

export default ArchiveComponent;