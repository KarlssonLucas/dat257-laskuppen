import React from 'react'

const SearchBar = () => {
    return(
      <form action="/" method="get">
          <label htmlFor="header-text">
              <span className="visually-hidden">Sök efter böcker</span>
          </label>
          <input
            type="text"
            id="header-text"
            placeholder="T.ex. Harry Potter och..."
            />
     </form>
    )};

  
export default SearchBar;
