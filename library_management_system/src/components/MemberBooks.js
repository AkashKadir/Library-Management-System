import React from "react";
import "./css/MemberBooks.css";

class MemberBooks extends React.Component {
  state = {
    booking: "Reserve",
    visibility: "",
    credentials: [],
    copies: this.props.eachBook.copies,
    decision: this.props.decision,
  };
  componentDidMount() {
    const { eachBook } = this.props;
    if (eachBook.copies <= 0) {
      this.setState({
        booking: "Out of Stock",
        visibility: "disabled",
      });
    }
  }
  onReserve = () => {
    const { eachBook } = this.props;
    const copies = eachBook.copies;
    const id = eachBook.id;
    const bookObject = {
      id: eachBook.id,
      rack_no: eachBook.rack_no,
      copies: eachBook.copies,
      title: eachBook.title,
      thumbnailUrl: eachBook.thumbnailUrl,
      authors: eachBook.authors,
      categories: eachBook.categories,
    };

    let reservedBooks = this.props.onReserve(bookObject, copies, id);
    if (reservedBooks === true) {
      this.setState({
        booking: "Reserved",
        visibility: "disabled",
        copies: this.state.copies - 1,
      });
    }
  };
  render() {
    const { eachBook } = this.props;
    return (
      <div className="card">
        <img
          src={eachBook.thumbnailUrl}
          className="card-img-top bookImage"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{eachBook.title}</h5>
          <p className="card-text">
            <small className="firstSmall">
              Rack No:&nbsp;&nbsp;
              {eachBook.rack_no}
            </small>
            <small className="secondSmall">
              Copies:&nbsp;&nbsp;
              {this.state.copies}
            </small>
            <h6>{eachBook.authors}</h6>
          </p>
        </div>
        <div className="reserveBtn">
          <a
            className={`${this.state.visibility} btn btn-primary`}
            onClick={() => this.onReserve()}
          >
            {this.state.booking}
          </a>
        </div>
      </div>
    );
  }
}
export default MemberBooks;
