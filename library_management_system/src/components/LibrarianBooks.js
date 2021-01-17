import React from "react";
import "./css/LibrarianBooks.css";

class LibrarianBooks extends React.Component {
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
  passID = () => {
    this.props.directToBook(this.props.eachBook.id);
  };
  render() {
    const { eachBook } = this.props;
    return (
      <div className="libraryCard card" onClick={this.passID}>
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
      </div>
    );
  }
}
export default LibrarianBooks;
