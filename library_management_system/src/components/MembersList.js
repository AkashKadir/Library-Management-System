import React from "react";
import axios from "axios";
import MemberListEach from "./MemberListEach";
import "./css/MemberList.css";
import MemberReservedBooks from "./MemberReservedBooks";

class MembersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      member: [],
      visible: "hiddenVisibility",
      id: 0,
      reservedBooks: [],
      checkoutBooks: [],
    };
  }
  memberListEachMethod = (id1) => {
    this.setState({
      visible: "showVisibility",
      id: id1,
    });
    axios.get(`http://localhost:4200/member/${id1}`).then((res) => {
      this.setState({
        reservedBooks: res.data.reserved_books,
        checkoutBooks: res.data.checkout_books,
      });
    });
  };
  render() {
    axios.get(`http://localhost:4200/member`).then((response) => {
      this.setState({
        member: response.data,
      });
    });
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <div className="memberList">
          {this.state.member.map((member1) => (
            <MemberListEach
              member1={member1}
              memberListEach={this.memberListEachMethod}
            />
          ))}
        </div>
        <MemberReservedBooks />
        {/* <div className={`${this.state.visible} memberBookDetails`}>
          <h2>{this.state.reservedBooks.id}</h2>
        </div> */}
      </div>
    );
  }
}
export default MembersList;
