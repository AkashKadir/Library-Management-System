import React from "react";
import axios from "axios";
import MyCheckedOutBooksComp from "./MyCheckedOutBooksComp";
import cry from "./gif/crying.gif";
class MyCheckedOutBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkOutBooks: [],
      userId: localStorage.getItem("id"),
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:4200/member/${this.state.userId}`)
      .then((response) => {
        this.setState({
          checkOutBooks: response.data.checkout_books,
        });
      });
  }
  removeChecked = (id) => {
    const { checkOutBooks, userId } = this.state;
    for (let i = 0; i < checkOutBooks.length; i++) {
      if (checkOutBooks[i].id === id) {
        checkOutBooks.splice(i, 1);
      }
    }
    const updateMember = {
      checkout_books: checkOutBooks,
    };
    axios.patch(`http://localhost:4200/member/${userId}`, updateMember);
  };
  render() {
    if (this.state.checkOutBooks.length === 0) {
      return (
        <React.StrictMode>
          <div className="notReserved">
            <span></span>
            <h2>You haven't checked-out any Books yet</h2>
          </div>
          <div className="crying">
            <img src={cry} />
          </div>
        </React.StrictMode>
      );
    } else {
      return (
        <div className="myBookList">
          {this.state.checkOutBooks.map((book) => (
            <MyCheckedOutBooksComp
              key={book.id}
              book={book}
              unCheck={this.removeChecked}
            />
          ))}
        </div>
      );
    }
  }
}

export default MyCheckedOutBooks;
