import React, { Fragment, useEffect, useState } from "react";
import "../css/toplistpage.css";

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
        response = fetchData("/api/users/1/points")
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
    fetch("/api/randomrecommended/1")
      .then((response) => response.json())
      .then((response) => {
        setRecBook(response[0]);
      });
  }


    return (
        <div className="m-page-general-styling">
            <div className="m-page-header">
                <h2> Topplista </h2>
            </div>
            <div className="m-page-inner-container">
                <div className="page-content">
                    <div className="top-reader-card">
                        <p className="card-title"> Veckans toppläsare </p>
                        <hr />
                        <p className="card-text">
                            {topReaderOfWeek.name} : {topReaderOfWeek.points}
                        </p>
                    </div>

                    <div className="top-book-card">
                        <p className="card-title"> Veckans bok </p>
                        <hr />
                        <p className="card-text"> {topWeeklyBook} </p>
                    </div>

                    <div className="my-points">
                        <p className="card-title"> Mina poäng </p>
                        <hr />
                        <p className="card-text"> {points} </p>
                    </div>

          <div className="my-recommendation">
            <p className="card-title"> Rekommendation </p>
            <hr />
            <p className="card-text"> {recBook.title}, {recBook.author}, {recBook.thumbnail}</p>
          </div>

                    <div className="top-lists">
                        <div className="top-list-header">
                            <label className="filter-label"> Filter: </label>
                            <button className="nameButton" onClick = {() => handleClick("name","asc")}> Elev</button>
                            <button className="classButton" onClick = {() => handleClick("classname","desc")}> Klass </button>
                            <button className="pointsButton" onClick = {() => handleClick("points","desc")}> Poäng </button>
                            <button className="readBooksButton"onClick = {() => handleClick("booksread","desc")}> Lästa böcker </button>
                        </div>
                        <div className="tableDiv">
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

/*<>
                <ul className="list-group list-group-flush">
                  {topList.map((listItem) => (
                    <li className="list-group-item">
                      <span className="student">Elev: {listItem.name}</span>
                      <span className="class">Klass: {listItem.classname}</span>
                      <span className="points">Poäng: {listItem.points} </span>
                      <span className="read-books">Lästa böcker: {listItem.booksread}</span>
                    </li>
                  ))}
                </ul>
              </>*/
