import React, { useEffect, useState } from "react";
import "./css/toplistpage.css";

const ToplistPage = () => {
    const [points, setPoints] = useState(0);
    const [topReaderOfWeek, settopReaderOfWeek] = useState([]);
    const [topWeeklyBook, setTopWeeklyBook] = useState("");
    const [topList, setTopList] = useState([]);
    const [recBook, setRecBook] = useState([]);

    useEffect(() => {
        let response = fetchData("/api/toplist?filter=points&order=desc")
        response.then(response => { settopReaderOfWeek(response[0]); setTopList(response) })
        response = fetchData("/api/mostreadbook")
        response.then(response => { setTopWeeklyBook(response[0].title) })
        response = fetchData("/api/userpoints")
        response.then(response => { setPoints(response[0].points); })
        fetchRec();
    }, []);

    const handleClick = (filter, order) => {
        console.log("/api/toplist?filter=" + filter + "&order=" + order)
        let response = fetchData("/api/toplist?filter=" + filter + "&order=" + order)
        console.log(response)
        response.then(response => { setTopList(response) })
    }
    
    const fetchData = (query) => {
        let req = { method: "GET", headers: { "Content-Type": "application/json" }, };
        return fetch(query, req).then((response) => response.json())
    }

  const fetchRec = () => {
    fetch("/api/recommendation")
      .then((response) => response.json())
      .then((response) => {
        setRecBook(response[0]);
      });
  }


    return (
        <div className="main-page-general-styling">
            <div className="main-page-header">
                <h2> Topplista </h2>
            </div>
            <div className="main-page-inner-container">
                <div className="main-page-content top-page-content">
                    <div className="top-top-reader-card">
                        <p className="top-card-title"> Veckans toppläsare </p>
                        <hr />
                        <p className="top-card-text">
                            {topReaderOfWeek.name} : {topReaderOfWeek.points}
                        </p>
                    </div>

                    <div className="top-top-book-card">
                        <p className="top-card-title"> Veckans bok </p>
                        <hr />
                        <p className="top-card-text"> {topWeeklyBook} </p>
                    </div>

                    <div className="top-my-points">
                        <p className="top-card-title"> Mina poäng </p>
                        <hr />
                        <p className="top-card-text"> {points} </p>
                    </div>

                    <div className="top-my-recommendation">
                        <p className="top-card-title">Bokrekommendation</p>
                        <hr />
                        <div className="top-inner-recommendation">
                            <div className="cbc-book-title">Titel: {recBook.title}</div>
                            <div className="cbc-book-author">Författare: {recBook.author}</div>
                            <div className="cbc-book-pages">Sidor: {recBook.pages}</div>
                            <div className="cbc-book-img">
                                <img size= '1g' src={(recBook.thumbnail) ? ((recBook.thumbnail.thumbnail) ? recBook.thumbnail.thumbnail : recBook.thumbnail): "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/450px-No_image_available_450_x_600.svg.png"} />
                            </div>
                        </div>
                    </div>

                    <div className="top-top-lists">
                        <div className="top-top-list-header">
                            <label className="top-filter-label"> Filter: </label>
                            <button className="top-nameButton" onClick = {() => handleClick("name","asc")}> Elev</button>
                            <button className="top-classButton" onClick = {() => handleClick("classname","desc")}> Klass </button>
                            <button className="top-pointsButton" onClick = {() => handleClick("points","desc")}> Poäng </button>
                            <button className="top-readBooksButton"onClick = {() => handleClick("booksread","desc")}> Lästa böcker </button>
                        </div>
                        <div className="top-tableDiv">
                            <table class="table table-holder">
                                <thead>
                                    <tr>
                                        <th scope="col">Elev</th>
                                        <th scope="col">Klass</th>
                                        <th scope="col">Poäng</th>
                                        <th scope="col">Lästa böcker</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topList.map((listItem) => (
                                        <tr>
                                            <td>{listItem.name}</td>
                                            <td>{listItem.classname} </td>
                                            <td>{listItem.points}</td>
                                            <td>{listItem.booksread}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToplistPage;
