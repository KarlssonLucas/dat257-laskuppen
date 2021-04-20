import React from 'react';
import "../css/toplistpage.css";

export default class ToplistPage extends React.Component {

    render() {
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
                            <p className="card-text"> J.L Borges </p>
                        </div>

                        <div className="top-book-card">
                            <p className="card-title"> Veckans bok </p>
                            <hr />
                            <p className="card-text"> Fiktioner </p>
                        </div>

                        <div className="my-points">
                            <p className="card-title"> Mina poäng </p>
                            <hr />
                            <p className="card-text"> 42 </p>
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
}
