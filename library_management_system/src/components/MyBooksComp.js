import React from "react";
import "./css/MyBooksComp.css";
import axios from "axios";

class MyBooksComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copies: props.book.copies,
      id: localStorage.getItem("id"),
      reserveVisibility: "",
      checkOutVisibility: "",
    };
  }
  onUnReserve = () => {
    const update = {
      copies: this.state.copies,
    };
    this.setState({
      reserveVisibility: "disabled",
      checkOutVisibility: "disabled",
    });
    alert("The book is Unreserved!");
    axios.patch(`http://localhost:4200/books/${this.props.book.id}`, update);
    this.props.remove(this.props.book.id);
  };
  onCheckOut = () => {
    alert("The book is Checked Out!");
    this.setState({
      checkOutVisibility: "disabled",
      reserveVisibility: "disabled",
    });
    this.props.remove(this.props.book.id);
    this.props.addCheckOut(this.props.book);
  };
  render() {
    const { book } = this.props;
    return (
      <div class="card">
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
            className={`${this.state.reserveVisibility} unreserveBtna1 btn btn-primary`}
            onClick={() => this.onUnReserve()}
          >
            Unreserve
          </a>
          <a
            className={`${this.state.checkOutVisibility} unreserveBtna2 btn btn-primary`}
            onClick={() => this.onCheckOut()}
          >
            CheckOut
          </a>
        </div>
      </div>
    );
  }
}
export default MyBooksComp;
