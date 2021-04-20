import '../css/choosebook.css';
import { useFormHook } from './useFormHook';
import React, { useState } from 'react';



const ChooseBookComponent = (props) => {

    var reward, search;
    var fetching = false;

    const [books, setBooks] = useState([]);

    const fetchedBooks = async (str) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/books/".concat(str), requestOptions).then(response => response.json()).then(response => {
            console.log("SET BOOKS: ", response);
            props.setBook(response[0]);
        }
        );

        if (str != search) {
            fetchedBooks(search);
        } else {
            fetching = false;
        }


    }

    const updateSearch = event => {

        search = event.target.value;

        if (!fetching && event.target.value.length >= 5) {
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
        <div className="page-container">
            <div className="A">
                <input
                    type="text"
                    id="header-text"
                    onChange={updateSearch}
                    placeholder="T.ex. Harry Potter och..."
                />
                {(books[0] == undefined) ? "No book" : JSON.stringify(books[0].title) + " " + JSON.stringify(books[0].authors) + " " + JSON.stringify(books[0].pageCount)}
            </div>

        </div>

    )
}


export default ChooseBookComponent;

