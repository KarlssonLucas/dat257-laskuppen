import React from "react";
import "./css/bookspage.css";
import BooklistComponent from '../components/BooklistComponet'
import Select from 'react-select';

const options = [
  { value: 'grade', label: 'Betyg' },
  { value: 'grade', label: 'Mest Lästa' },
  { value: 'title', label: 'Namn' },
  { value: 'pages', label: 'Sidor' },
  { value: 'author', label: 'Författare' }
];

export default class BooksPage extends React.Component {
    state = {selectedOption: options[2]};

  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
    console.log("change: " + selectedOption?.value)
  };


  render() {
    const { selectedOption } = this.state;
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
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
              </div>
              <div className="table-container">
                <BooklistComponent filter={selectedOption?.value}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//title author pages grade