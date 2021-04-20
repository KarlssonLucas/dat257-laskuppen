import React,{useEffect, useState} from 'react';
import "../css/toplistpage.css";

const ToplistPage = () => {

    const [points,setPoints] = useState(0)
    const [topReaderOfWeek, settopReaderOfWeek] = useState([])
    const [topWeeklyBook, setTopWeeklyBook] = useState("")


    useEffect(() =>{
        fetchPoints();
        fetchTopReader();
        fetchTopWeeklyBook();
    },[]);

    const userReq = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        id:2
    }

    const fetchPoints = () =>{

        fetch("/api/users/1/points", userReq).then(response => response.json()).then(response => {
            console.log("USER: ", response);
            console.log(response[0].points)
            setPoints(response[0].points)
        })
    }
    
    const topReq = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, 
    }

    const fetchTopReader = () => {
        fetch("/api/toplist?filter=points&order=desc", topReq).then(response => response.json()).then(response => {
            console.log("TOP READER: ", response);
            settopReaderOfWeek(response[0])
        })
    }

    const fetchTopWeeklyBook = () => {
        fetch("/api/mostreadbook", topReq).then(response => response.json()).then(response => {
        setTopWeeklyBook(response[0].title)
        })
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
                        <p className="card-text"> {topReaderOfWeek.name} : {topReaderOfWeek.points}  </p>
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
                        <p className="card-text"> Alefen (Ljudbok) </p>
                    </div>

                    <div className="top-lists">

                        <div className="top-list-top-part">

                            <div className="tltp-header">
                                <p > Topplistor: </p>
                            </div>

                            <div className="tltp-names">
                                <p > Namn (Person/Hero): </p>
                            </div>

                            <div className="tltp-classes">
                                <p > Klasser (Lag): </p>
                            </div>

                            <div className="tltp-points">
                                <p > Poäng (XP): </p>
                            </div>

                            <div className="tltp-read-books">
                                <p > Böcker (Arkiv): </p>
                            </div>
                        </div>

                        <div className="top-list-bottom-part">
                            <p>Elev, klass etc</p>

                            <div className="tlbp-names">
                                <p > James Joyce: </p>
                            </div>

                            <div className="tlbp-classes">
                                <p > 2B: </p>
                            </div>

                            <div className="tlbp-points">
                                <p > 4200: </p>
                            </div>

                            <div className="tlbp-read-books">
                                <p > 42: </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ToplistPage;
