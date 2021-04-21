import '../css/makereview.css';
import { useFormHook } from './useFormHook';
import Reward from 'react-rewards'
import React, { useState } from 'react';



const MakeReviewComponent = (props) => {

    var reward;
    const press = () => {
        console.log(values);

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
        title: props.book.title,
        grade: null,
        recommended: null,
        author: props.book.author,
        pages: props.book.pages,
        thumbnail: props.book.thumbnail,
        desc: props.book.desc,
        review: null
    });


    console.log(values);
    console.log(props.book);
    function submitForm() {

        

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
        console.log("BODY: " + JSON.stringify(values));
         fetch("/api/submitreview", requestOptions).then(response => response.json()).then(response => {
            console.log("FROM BACKEND: ", response);
        })
    }

    return (
        <div className="page-container">
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

    )
}


export default MakeReviewComponent;

