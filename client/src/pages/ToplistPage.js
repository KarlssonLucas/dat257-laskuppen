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
                            <p className="card-text"> Borges </p>
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
                            <p className="card-text"> Alefen </p>
                        </div>

                        <div className="top-lists">

                            <div className="top-list-top-part">
                                <p > Topplistor: </p>
                            </div>

                            <div className="top-list-bottom-part">
                                <p>Elev, klass etc</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
