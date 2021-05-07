import './css/archive.css';
import React, { useState, useEffect } from 'react';

const ArchiveComponent = (props) => {
    const [book, setBook] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async (str) => {
        await fetch("/api/user/reviews").then(response => response.json()).then(response => {
            setReviews(response);
        });
    }


    const getStatus = (review) =>{
        if(review.published === true){
            return "published"
        }
        if(review.accepted === true){
            return "accepted"
        }
        else{
            return "not accepted"
        }
    }
    const reviewsToBook = (reviews) => {
        return (
            <div>
                {reviews.map((review) => {
                    return (
                        <div className={"arc-review-container " + getStatus(review).replace(" ","-")}>
                            <div className="arc-review-img">
                                <img src={review.thumbnail}/>
                            </div>
                            <div className="arc-review-info">
                            <p>Titel: {review.title}</p>
                            <p>Författare: {review.author}</p>
                            <p>Sidor: {review.pages}</p>
                            </div>
                            <div className="arc-review-text">
                            {review.summary}
                            </div>
                            <div className="arc-review-info2">
                            <p>Betyg: {review.rating}</p>
                            <p>Läsvärd: {(review.worthreading === true) ? "Ja" : "Nej"}</p>
                            <p>Status: {getStatus(review)}</p>
                            </div>
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