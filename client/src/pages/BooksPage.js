import React from "react";
import "./css/bookspage.css";

export default class BooksPage extends React.Component {


    constructor() {
        super();
        this.state = {};
        
        this.setReviewedBooks = this.setReviewedBooks.bind(this)
    }

    fetchReviewBooks(){
        fetch()
    }





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
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Titel</th>
                      <th scope="col">Författare</th>
                      <th scope="col">Sidor</th>
                      <th scope="col">Snittbetyg</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
