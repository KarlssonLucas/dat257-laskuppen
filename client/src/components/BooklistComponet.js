import React,{useEffect, useState} from "react";

const BooklistComponent = (props) => {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    fetchReviewBooks();
    console.log("props: " + props.filter)
  }, [props.filter,props.search]);

  
  //Fetches the books from DB with filters and search
  const fetchReviewBooks = () => {
    let req = { method: "GET", headers: { "Content-Type": "application/json" }}

    fetch("/api/reviewedbooks?filter=" + props.filter+"&search=" + props.search,req)
      .then((response) => response.json())
      .then((response) => {
          console.log(response)
          setBooks(response);
      });
  };

  

  return (
    <table class="table">
      <thead>
        <tr>
          <th width="40%" scope="col">Titel</th>
          <th width="20%" scope="col">Författare</th>
          <th width="20%" scope="col">Sidor</th>
          <th width="20%" scope="col">Snittbetyg</th>
        </tr>
      </thead>
      <tbody>
        {Books.map((listItem) => (
          <tr>
            <td>{listItem.title}</td>
            <td>{listItem.author}</td>
            <td>{listItem.pages}</td>
            <td>{listItem.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooklistComponent;