import React from "react";
import { Link } from "react-router-dom";
import "./css/Login.css";
import axios from "axios";
import back_img from "./images/books.jpg";

class Login extends React.Component {
  constructor() {
    super();
    document.title = "Login | Roman Library";
    this.state = {
      username: "",
      password: "",
      credentials: [],
    };
  }
  onUsernamechange = (event) => {
    this.setState({
      [event.target.id]: [event.target.value],
    });
  };
  onPasswordchange = (event) => {
    this.setState({
      [event.target.id]: [event.target.value],
    });
  };
  componentDidUpdate() {
    let type = "";
    const { username } = this.state;
    if (username !== "") {
      if (username[0].slice(0, 3) === "LIB") {
        type = "librarian";
      } else if (username[0].slice(0, 3) === "MEM") {
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
    const { credentials, username, password } = this.state;
    for (let user of credentials) {
      if (user.userId === username[0]) {
        if (user.password === password[0]) {
          localStorage.setItem("id", user.id);
          this.props.history.push("/Home");
          break;
        } else {
          alert("Your Password is wrong!");
          break;
        }
      }
    }
  };

  render() {
    return (
      <div>
        <img className="nav-image" src={back_img} alt="..." />
        <div className="Login">
          <form onSubmit={this.onFormSubmit.bind(this)}>
            <h2>LOGIN</h2>
            <br></br>
            <div className="form-group">
              <label htmlFor="username">User Id</label>
              <input
                type="text"
                className="form-control"
                id="username"
                aria-describedby="emailHelp"
                onChange={this.onUsernamechange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.onPasswordchange}
              />
              <Link to="/ForgotPassword" className="small">
                <small>Forgot Password?</small>
              </Link>
            </div>
            <button type="submit" className="btn login-submit">
              Submit
            </button>
            <br></br>
            <br></br>
            <p>
              Not yet Registered?
              <Link to="/SignUp" className="spanLink">
                <span>&nbsp;SignUp</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
