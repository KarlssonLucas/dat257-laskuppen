import React from "react";
import "./css/bookspage.css";
import BooklistComponent from '../components/BooklistComponet'

export default class BooksPage extends React.Component {

  render() {
    return (
      <div className="main-page-general-styling">
        <div className="main-page-header">
          <h2> Böcker </h2>
        </div>
        <div className="main-page-inner-container">
          <div className="main-page-content">
            <div className="books-content-grid">
              <div className="searchbar">
                <span>Sök efter bok:</span>
                <input
                  type="text"
                  onChange={() => {
                    console.log("Search Updated");
                  }}
                  placeholder="Boktitel"
                />
              </div>
              <div className="filter">
                <button>Filtrera sökresultat</button>
              </div>
              <div className="table-container">
                <BooklistComponent filter="hej"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//title author pages grade