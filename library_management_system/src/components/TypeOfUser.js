import React from "react";
import "./css/TypeOfUser.css";

class TypeOfUser extends React.Component {
  asMember = () => {
    localStorage.setItem("type", "member");
    this.props.history.push("/SignUp/Member");
  };
  asLibrarian = () => {
    localStorage.setItem("type", "librarian");
    this.props.history.push("/SignUp/Librarian");
  };
  render() {
    return (
      <div className="SignUp">
        <h2>SIGNUP</h2>
        <br></br>
        <h5>You want to signup..</h5>
        <br></br>
        <button
          type="button"
          onClick={() => this.asMember()}
          class="btn first
          "
        >
          As a Member
        </button>
        <button
          type="button"
          class="btn second"
          onClick={() => this.asLibrarian()}
        >
          As a Librarian
        </button>
      </div>
    );
  }
}

export default TypeOfUser;
