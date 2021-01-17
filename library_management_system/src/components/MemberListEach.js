import React from "react";

class MemberListEach extends React.Component {
  memberListEach = () => {
    this.props.memberListEach(this.props.member1.id);
  };
  render() {
    return (
      <div
        class="card border-info mb-3"
        style={{ "max-width": 12 + "rem" }}
        onClick={this.memberListEach}
      >
        <div class="card-header">{this.props.member1.userId}</div>
        <div class="card-body">
          <h5 class="card-title">{this.props.member1.username}</h5>
          <p class="card-text">
            Phone Number : {this.props.member1.phoneNumber}
          </p>
        </div>
      </div>
    );
  }
}
export default MemberListEach;
