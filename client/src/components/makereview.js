import '../css/makereview.css';
import { useFormHook } from './useFormHook';
import Reward from 'react-rewards'
import React, { useState } from 'react';



const MakeReviewComponent = () => {

    var reward,search;
    var fetching = false; 

    const [books, setBooks] = useState([]);

    const fetchedBooks = async (str) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };

        await fetch("/api/books/".concat(str), requestOptions).then(response => response.json()).then(response => {
                console.log("SET BOOKS: " , response);
                setBooks(response);
            }
        );

        if(str != search){
            fetchedBooks(search);
        }else{
            fetching=false;
        }


    }

    const updateSearch = event =>  {

        search = event.target.value;

        if(!fetching && event.target.value.length >= 5){
            fetching = true;           
            fetchedBooks(event.target.value);
        }
       
    };



    const press = () => {
        for (let attr in values) {
            if (values[attr] == null) { // WRONG INPUT
                reward.punishMe();
                return false;
            }
        }

        reward.rewardMe();

        submitForm();

    }

    const [values, handleChange] = useFormHook({
        title: null,
        grade: null,
        recommended: null,
        author: null,
        pages: null,
        review: null
    });

    

    function submitForm() {


        console.log(JSON.stringify(values))

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        fetch("/api/submitreview", requestOptions).then(response => response.json()).then(response => {
            console.log("FROM BACKEND: ", response);
        })
    }

    return (

        <div className="m-page-general-styling">
            <div className="m-page-header">
                 <h2> Skriv Recensioner </h2> 
            </div>
        <div className="m-page-inner-container">
            <div className="page-container">
                <div className="A">
                    <input
                        type="text"
                        id="header-text"
                        onChange={updateSearch}
                        placeholder="T.ex. Harry Potter och..."
                    />
                    {(books[0]==undefined) ? "No book" : JSON.stringify(books[0].title) + " " + JSON.stringify(books[0].authors) + " " + JSON.stringify(books[0].pageCount)}
                </div>

                <div className="B">
                    <div className="score">
                        <p> Betyg </p>
                        <input name="grade" type='number' value={values.grade} onChange={(e) => {
                            var val = e.target.value;
                            if (val > 10 || val < 1)
                                return;
                            handleChange(e);
                        }} />
                    </div>
                    <div className="likeable">
                        <p> Läsvärd </p>
                        <input name="recommended" type='radio' value={true} onChange={handleChange} />Ja--
                        <input name="recommended" type='radio' value={false} onChange={handleChange} />Nej
                        </div>
                </div>
                <div className="C">
                    <div className="title">
                        <p> Titel </p>
                        <input name="title" type='text' value={values.title} onChange={handleChange} />
                    </div>
                    <div className="author">
                        <p> Författare </p>
                        <input name="author" type='text' value={values.author} onChange={handleChange} />
                    </div>
                    <div className="pages">
                        <p> Sidor </p>
                        <input name="pages" type='number' value={values.pages} onChange={handleChange} min={0} />
                    </div>
                    <div className="pic">
                        <img src="https://pbs.twimg.com/profile_images/1181583065811996673/ylZLdBGL_400x400.jpg" height={100} width={100} />

                    </div>
                </div>
                <div className="D">
                    <p> Recension </p>
                    <textarea name="review" type='text' value={values.review} onChange={handleChange} rows={10} cols={100} />

                </div>
                <div className="E">
                    <Reward ref={ref => { reward = ref }} type='confetti'>
                        <button className="btn btn-success" onClick={press}>Skicka</button>
                    </Reward>
                </div>
            </div>
            </div>
        </div>
    )
}


export default MakeReviewComponent;

