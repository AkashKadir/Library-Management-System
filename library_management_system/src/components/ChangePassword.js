import React from "react";
import "./css/ChangePassword.css";
import axios from "axios";
import back_img from "./images/books.jpg";

class ChangePassword extends React.Component {
  constructor() {
    super();
    document.title = "Change Password | Roman Library";
    this.state = {
      newPass: "",
      confirmNewPass: "",
      credentials: [],
      type: localStorage.getItem("type"),
      id: localStorage.getItem("id"),
    };
  }
  onnewPasschange = (event) => {
    this.setState({
      [event.target.id]: [event.target.value],
    });
  };
  onconfirmNewPasschange = (event) => {
    this.setState({
      [event.target.id]: [event.target.value],
    });
  };
  componentDidMount() {
    const { type, id } = this.state;
    axios.get(`http://localhost:4200/${type}/${id}`).then((response) => {
      this.setState({
        credentials: response.data,
      });
    });
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    const { newPass, confirmNewPass, credentials, type, id } = this.state;
    if (newPass[0] === confirmNewPass[0]) {
      const change = {
        password: newPass[0],
        prevPassword: credentials.password,
      };
      axios
        .patch(`http://localhost:4200/${type}/${id}`, change)
        .then(() => {
          alert("Your Password is changed!");
          this.props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Your passwords are not matching with each other!");
    }
  };
  render() {
    return (
      <div>
        <img className="nav-image" src={back_img} alt="..." />
        <div className="changePass">
          <form onSubmit={this.onFormSubmit.bind(this)}>
            <h3>CHANGE PASSWORD</h3>
            <br></br>
            <div className="form-group">
              <label htmlFor="newPass">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPass"
                aria-describedby="emailHelp"
                onChange={this.onnewPasschange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPass">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmNewPass"
                onChange={this.onconfirmNewPasschange}
              />
            </div>
            <br></br>
            <button type="submit" className="btn changePassBtn">
              Change Password
            </button>
            <br></br>
            <br></br>
          </form>
        </div>
      </div>
    );
  }
}
export default ChangePassword;
