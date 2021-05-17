import React from "react";
import "./css/bookspage.css";
import BooklistComponent from "../components/BooklistComponet";

export default class BooksPage extends React.Component {

  render() {
    return (
      <div className="main-page-general-styling">
        <div className="main-page-header glassMorphism">
          <h2> Böcker </h2>
        </div>
        <div className="main-page-inner-container">
          <BooklistComponent />
        </div>
      </div>
    );
  }
}
