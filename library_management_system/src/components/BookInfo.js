import React from "react";
import axios from "axios";
import "./css/BookInfo.css";
class BookInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      member: [],
      book: [],
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:4200/member`).then((res) => {
      this.setState({
        member: res.data,
      });
    });
    axios.get(`http://localhost:4200/books/${this.state.id}`).then((res) => {
      this.setState({
        book: res.data,
      });
    });
  }
  render() {
    const { id, member, book } = this.state;
    let reserved_books1 = [];
    let checkout_books1 = [];
    for (let i = 0; i < member.length; i++) {
      let count = 0;
      for (let j = 0; j < member[i].reserved_books.length; j++) {
        if (id == member[i].reserved_books[j].id) {
          reserved_books1.push(member[i].id);
          count++;
          break;
        }
      }
      if (count === 0) {
        for (let k = 0; k < member[i].checkout_books.length; k++) {
          if (id == member[i].checkout_books[k].id) {
            checkout_books1.push(member[i].id);
            break;
          }
        }
      }
    }
    let reservedBooksCount = 0;
    let checkoutBooksCount = 0;
    return (
      <div className="bookInfo">
        <br />
        <br />
        <br />
        <br />
        <div className="bookInfoHeader">
          <img src={book.thumbnailUrl} className="" alt="..." />
          <div className="Info">
            <h2>{book.title}</h2>
            <h4>Authors: {book.authors}</h4>
            <h5>Rack Number: {book.rack_no}</h5>
            <h5>Copies: {book.original_copies}</h5>
            <h6>
              <i class="far fa-thumbs-up"></i>&nbsp;&nbsp;
              {book.no_of_times_reserved}
            </h6>
          </div>
        </div>
        <div className="membersInfoBooks">
          <div className="reservedMembers">
            <h4>RESERVED MEMBERS</h4>
            {reserved_books1.length > 0 ? (
              member.map((member1) => {
                if (member1.id == reserved_books1[reservedBooksCount]) {
                  reservedBooksCount++;
                  return (
                    <>
                      <h5 id="reservedMember">
                        User ID : {member1.userId} &nbsp;&nbsp;&nbsp;&nbsp;User
                        Name: {member1.username}
                      </h5>
                      <br />
                    </>
                  );
                }
              })
            ) : (
              <h5>No member reserved this book</h5>
            )}
          </div>
          <div className="checkoutMembers">
            <h4>CHECKEDOUT MEMBERS</h4>
            {checkout_books1.length > 0 ? (
              member.map((member1) => {
                if (member1.id == checkout_books1[checkoutBooksCount]) {
                  checkoutBooksCount++;
                  return (
                    <>
                      <h5 id="checkoutMember">
                        User ID : {member1.userId} &nbsp;&nbsp;&nbsp;&nbsp;User
                        Name: {member1.username}
                      </h5>
                      <br />
                    </>
                  );
                }
              })
            ) : (
              <h5>No member Checkedout this book</h5>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default BookInfo;
