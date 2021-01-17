import React from "react";
import "./css/MyCheckedOutBooksComp.css";
import axios from "axios";

class MyCheckedOutBooksComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copies: props.book.copies,
      checkVisibility: "",
    };
  }
  onUnCheckOut = () => {
    alert("Book is Unchecked!");
    this.setState({
      checkVisibility: "disabled",
    });
    const update = {
      copies: this.state.copies,
    };
    axios.patch(`http://localhost:4200/books/${this.props.book.id}`, update);
    this.props.unCheck(this.props.book.id);
  };
  render() {
    const { book } = this.props;
    return (
      <div className="card">
        <img src={book.thumbnailUrl} class="card-img-top bookImage" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">
            <small className="firstSmall">
              Rack No:&nbsp;&nbsp;
              {book.rack_no}
            </small>
            <h6>{book.authors}</h6>
          </p>
        </div>
        <div className="unreserveBtn">
          <a
            className={`${this.state.checkVisibility} unreserveBtna btn btn-primary`}
            onClick={() => this.onUnCheckOut()}
          >
            UnCheck
          </a>
        </div>
      </div>
    );
  }
}
export default MyCheckedOutBooksComp;
