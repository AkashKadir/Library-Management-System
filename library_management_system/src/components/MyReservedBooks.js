import React from "react";
import MyBooksComp from "./MyBooksComp";
import axios from "axios";
import "./css/MyReservedBooks.css";
import cry from "./gif/crying.gif";
class MyReservedBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("id"),
      reservedBooks: [],
      checkOutBooks: [],
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:4200/member/${this.state.userId}`)
      .then((response) => {
        this.setState({
          reservedBooks: response.data.reserved_books,
          checkOutBooks: response.data.checkout_books,
        });
      });
  }
  removeReserved = (id) => {
    const { reservedBooks, userId } = this.state;
    for (let i = 0; i < reservedBooks.length; i++) {
      if (reservedBooks[i].id === id) {
        reservedBooks.splice(i, 1);
      }
    }
    const updateMember = {
      reserved_books: reservedBooks,
    };
    axios.patch(`http://localhost:4200/member/${userId}`, updateMember);
  };
  addCheckOut = (book) => {
    const { checkOutBooks, userId } = this.state;
    checkOutBooks.push(book);
    const update = {
      checkout_books: checkOutBooks,
    };
    axios.patch(`http://localhost:4200/member/${userId}`, update);
  };
  render() {
    if (this.state.reservedBooks.length === 0) {
      return (
        <React.StrictMode>
          <div className="notReserved">
            <span></span>
            <h2>You haven't reserved any Books yet</h2>
          </div>
          <div className="crying">
            <img src={cry} />
          </div>
        </React.StrictMode>
      );
    } else {
      return (
        <div className="myBookList">
          {this.state.reservedBooks.map((book) => (
            <MyBooksComp
              key={book.id}
              book={book}
              remove={this.removeReserved}
              addCheckOut={this.addCheckOut}
            />
          ))}
        </div>
      );
    }
  }
}

export default MyReservedBooks;
