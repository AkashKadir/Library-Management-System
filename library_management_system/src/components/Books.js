import React from "react";
import axios from "axios";
import MemberBooks from "./MemberBooks";
import LibrarianBooks from "./LibrarianBooks";
import "./css/Books.css";

class Books extends React.Component {
  constructor() {
    super();
    this.state = {
      type: localStorage.getItem("type"),
      userId: localStorage.getItem("id"),
      books: [],
      searchInput: "",
      credentials: [],
      checkoutBooks: [],
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:4200/books`)
      .then((response) => {
        this.setState({
          books: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:4200/member/${this.state.userId}`)
      .then((response) => {
        this.setState({
          credentials: response.data.reserved_books,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:4200/member/${this.state.userId}`)
      .then((response) => {
        this.setState({
          checkoutBooks: response.data.checkout_books,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  memberSearchChange = (event) => {
    const value = [event.target.value];
    axios
      .get(`http://localhost:4200/books?q=${value}`)
      .then((response) => {
        this.setState({
          books: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  btnClick = () => {
    const input = document.getElementById("searchInput");
    const searchBtn = document.getElementById("search-btn");

    const expand = () => {
      searchBtn.classList.toggle("close");
      input.classList.toggle("square");
    };

    searchBtn.addEventListener("click", expand);
  };
  onReserve = (bookObject, copy, id) => {
    let count = 0;
    const { userId, credentials, checkoutBooks } = this.state;
    let reserve = this.state.credentials;
    if (credentials.length === 0 && checkoutBooks.length === 0) {
      reserve.push(bookObject);
      const register = {
        reserved_books: reserve,
      };
      const copies = {
        copies: copy - 1,
      };
      axios.patch(`http://localhost:4200/member/${userId}`, register);
      axios.patch(`http://localhost:4200/books/${id}`, copies);
      return true;
    } else {
      for (let i = 0; i < credentials.length; i++) {
        if (credentials[i].id === id) {
          alert("This book is reserved already!");
          count++;
          break;
        }
      }
      for (let i = 0; i < checkoutBooks.length; i++) {
        if (checkoutBooks[i].id === id) {
          alert("This book is checked-out already!");
          count++;
          break;
        }
      }
      if (count === 0) {
        reserve.push(bookObject);
        const register = {
          reserved_books: reserve,
        };
        const copies = {
          copies: copy - 1,
        };
        axios.patch(`http://localhost:4200/member/${userId}`, register);
        axios.patch(`http://localhost:4200/books/${id}`, copies);
      }
      if (count === 0) return true;
      else return false;
    }
  };
  directToBook = (id) => {
    this.props.history.push(`/Home/BookInfo/${id}`);
  };
  render() {
    if (this.state.type === "member") {
      return (
        <div className="books">
          <br />
          <br />
          <br />
          <br />
          <h1>Search the books here</h1>
          <form id="content">
            <input
              type="text"
              name="input"
              class="input"
              id="searchInput"
              onChange={this.memberSearchChange}
            />
            <button
              type="reset"
              class="search"
              id="search-btn"
              onClick={() => this.btnClick()}
            ></button>
          </form>
          <div className="bookList">
            {this.state.books.map((book) => (
              <MemberBooks
                reserve={this.state.credentials}
                key={book.id}
                eachBook={book}
                onReserve={this.onReserve}
              />
            ))}
          </div>
        </div>
      );
    } else if (this.state.type === "librarian") {
      return (
        <div className="books">
          <br />
          <br />
          <br />
          <br />
          <h1>Search the Books here</h1>
          <form id="content">
            <input
              type="text"
              name="input"
              class="input"
              id="searchInput"
              onChange={this.memberSearchChange}
            />
            <button
              type="reset"
              class="search"
              id="search-btn"
              onClick={() => this.btnClick()}
            ></button>
          </form>
          <div className="bookList">
            {this.state.books.map((book) => (
              <LibrarianBooks
                directToBook={this.directToBook}
                reserve={this.state.credentials}
                key={book.id}
                eachBook={book}
                onReserve={this.onReserve}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}
export default Books;
