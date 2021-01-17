import React from "react";
import "./css/MyBooksChoice.css";
import { Link } from "react-router-dom";
class MyBooksChoice extends React.Component {
  onButtonOneClick = () => {
    this.props.history.push("/ReservedBooks");
  };
  render() {
    return (
      <React.StrictMode>
        <Link to="/Home/MyBooks/">
          <button type="button" class="btn btn-primary button-1">
            My Reserved Books
          </button>
        </Link>
        <Link to="/Home/MyBooks/CheckedOutBooks">
          <button type="button" class="btn btn-primary button-2">
            My Checked-Out Books
          </button>
        </Link>
      </React.StrictMode>
    );
  }
}
export default MyBooksChoice;
