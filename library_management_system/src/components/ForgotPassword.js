import React from "react";
import "./css/ForgotPassword.css";
import axios from "axios";
import back_img from "./images/books.jpg";

class ForgotPassword extends React.Component {
  constructor() {
    super();
    document.title = "Forgot Password | Roman Library";
    this.state = {
      userId: "",
      prevPassword: "",
      phone: "",
      credentials: [],
    };
  }
  onUserIdchange = (event) => {
    this.setState({
      [event.target.id]: [event.target.value],
    });
  };
  onPhonechange = (event) => {
    this.setState({
      [event.target.id]: [event.target.value],
    });
  };
  onPrevPasswordchange = (event) => {
    this.setState({
      [event.target.id]: [event.target.value],
    });
  };
  componentDidUpdate() {
    let type = "";
    const { userId } = this.state;
    if (userId !== "") {
      if (userId[0].slice(0, 3) === "LIB") {
        type = "librarian";
      } else if (userId[0].slice(0, 3) === "MEM") {
        type = "member";
      }
      axios
        .get(`http://localhost:4200/${type}`)
        .then((response) => {
          localStorage.setItem("type", type);
          this.setState({ credentials: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    const { credentials, userId, prevPassword, phone } = this.state;
    for (let user of credentials) {
      if (user.userId === userId[0]) {
        if (prevPassword[0] !== "") {
          if (user.prevPassword === prevPassword[0]) {
            localStorage.setItem("id", user.id);
            this.props.history.push("/ChangePassword");
            break;
          } else {
            alert("Your Previous Password is wrong! Try with Phone Number");
            break;
          }
        } else if (phone[0] !== "") {
          if (user.phoneNumber === phone[0]) {
            localStorage.setItem("userId", user.id);
            this.props.history.push("/ChangePassword");
            break;
          } else {
            alert("Your Phone Number is wrong! Try with Previous Password");
            break;
          }
        }
      }
    }
  };
  render() {
    return (
      <div>
        <img className="nav-image" src={back_img} alt="..." />
        <div className="forgot">
          <form onSubmit={this.onFormSubmit.bind(this)}>
            <h3>FORGOT PASSWORD</h3>
            <br></br>
            <div className="form-group">
              <label htmlFor="userId">User Id</label>
              <input
                type="text"
                className="form-control"
                id="userId"
                aria-describedby="emailHelp"
                onChange={this.onUserIdchange}
              />
            </div>
            <hr />
            <div className="form-group">
              <label htmlFor="prevPassword">Previous Password</label>
              <input
                type="password"
                className="form-control"
                id="prevPassword"
                onChange={this.onPrevPasswordchange}
              />
            </div>
            <h6>(or)</h6>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                onChange={this.onPhonechange}
              />
            </div>
            <button type="submit" className="btn login-submit">
              Submit
            </button>
            <br></br>
            <br></br>
          </form>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
