import '../css/choosebook.css';
import { useFormHook } from './useFormHook';
import React, { useState, useEffect } from 'react';



const ChooseBookComponent = (props) => {

    var search;
    var fetching = false;

    const [books, setBooks] = useState([]);
    const [bestBooks, setBestBooks] = useState([]);
    const [recentBooks, setRecentBooks] = useState([]);

    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch("/api/mostreadbook", requestOptions).then(response => response.json()).then(response => {
            setBestBooks(response);
        }
        );

        fetch("/api/latestreviews", requestOptions).then(response => response.json()).then(response => {
            console.log(response);
            setRecentBooks(response);
        }
        );

    }, []);

    const fetchFromDatabase = async (str) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        let res;

        await fetch("/api/booksearch/".concat(str), requestOptions).then(response => response.json()).then(response => {
            res = response;
        }
        );

        if (res.length == 0 && str.length >= 5) {
            console.log(str, "DB EMPTY ");
            await fetchFromGoogle(str);
        }
        else {
            console.log(str, "SET BOOKS DB: ", res);
            setBooks(res);
        }

        if (str != search) {
            console.log(str," MISSMATCH ", search);
            await fetchFromDatabase(search);
        } 

    }


    const fetchFromGoogle = async (str) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/books/".concat(str), requestOptions).then(response => response.json()).then(response => {
            console.log(str," SET BOOKS GOOGLE: ", response);
            setBooks(response);
        }
        );

        

    }


    const fetchData = async (str) => {
      
        await fetchFromDatabase(str);
        console.log("FETCHING DONE",str)
        fetching = false;
    }

    const updateSearch = event => {
        search = event.target.value;
        console.log("UPDATE SEARCH ",search)

        if(search.length == 0){
            setBooks([])
        }
        else if (!fetching) {
            fetching = true;
            console.log("FETCHING",search)
            fetchData(search)
        }

        console.log("UPDATE SEARCH DONE",search)

    };


    const showResult = (books) => {


        return (
            <div>

                {books.map((book) => {
                    return (
                        <div className="cbc-book" onClick={() => { props.setBook(book) }}>
                            <div className="cbc-book-title">Titel: {book.title}</div>
                            <div className="cbc-book-author">Författare: {book.author}</div>
                            <div className="cbc-book-pages">Sidor: {book.pages}</div>
                            <div className="cbc-book-img">
                                <img src={(book.thumbnail) ? book.thumbnail.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/450px-No_image_available_450_x_600.svg.png"} />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }


    return (
        <div className="cbc-page-container">
            <div className="cbc-search-book">
                <input
                    type="text"
                    id="header-text"
                    onChange={updateSearch}
                    placeholder="T.ex. Harry Potter och..."
                />
                {(books[0] == undefined) ? "No book" : JSON.stringify(books[0].title) + " " + JSON.stringify(books[0].authors) + " " + JSON.stringify(books[0].pageCount)}
            </div>

            <div className="cbc-search-result">
                <div className="">Sökresultat:</div>
                {showResult(books)}
            </div>

            <div className="cbc-best-result">
                <div className="">Bästa böckerna just nu:</div>
                {showResult(bestBooks)}

            </div>

            <div className="cbc-recent-result">
                <div className="">Senast recenserade böckerna:</div>
                {showResult(recentBooks)}

            </div>


        </div>

    )
}


export default ChooseBookComponent;

