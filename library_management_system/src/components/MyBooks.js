import React from "react";
import "./css/MyBooks.css";
import { Switch, Route } from "react-router-dom";
import MyReservedBooks from "./MyReservedBooks";
import MyCheckedOutBooks from "./MyCheckedOutBooks";
import MyBooksChoice from "./MyBooksChoice";

class MyBooks extends React.Component {
  render() {
    return (
      <div className="myBooks">
        <br />
        <br />
        <br />
        <br />
        <MyBooksChoice />

        <Switch>
          <Route path="/Home/MyBooks/" exact component={MyReservedBooks} />
          <Route
            path="/Home/MyBooks/CheckedOutBooks"
            component={MyCheckedOutBooks}
          />
        </Switch>
      </div>
    );
  }
}
export default MyBooks;
