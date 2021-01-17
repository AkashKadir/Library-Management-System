import React from "react";
import "./css/SignUpInputs.css";
import axios from "axios";

class SignUp extends React.Component {
  constructor() {
    super();
    document.title = "SignUp | Roman Library";
    this.state = {
      username: "",
      password: "",
      phoneNumber: "",
      type: localStorage.getItem("type"),
      userId: "",
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
  onNumberchange = (event) => {
    this.setState({
      [event.target.id]: [event.target.value],
    });
  };
  componentDidMount() {
    axios
      .get(`http://localhost:4200/${this.state.type}?_sort=id&_order=desc`)
      .then((response) => {
        this.setState({ userId: response.data[0].userId });
        this.userIdExtraction();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  userIdExtraction = () => {
    const userid = this.state.userId;
    const number = userid.slice(4, userid.length + 1);
    const alphabet = userid.slice(0, 4);
    let count = Number(number);
    count++;
    const countString = count.toString();
    const length = countString.length;
    if (length === 1) {
      this.setState({ userId: alphabet + "00" + countString });
    } else if (length === 2) {
      this.setState({ userId: alphabet + "0" + countString });
    } else if (length === 3) {
      this.setState({ userId: alphabet + countString });
    }
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const { username, password, phoneNumber, type, userId } = this.state;
    if (username !== "" && password !== "" && phoneNumber !== "") {
      let register = {};
      if (type === "member") {
        register = {
          userId: userId,
          username: username[0],
          password: password[0],
          phoneNumber: phoneNumber[0],
          prevPassword: "",
          checkout_books: [],
          reserved_books: [],
        };
      } else if (type === "librarian") {
        register = {
          userId: userId,
          username: username[0],
          password: password[0],
          phoneNumber: phoneNumber[0],
          prevPassword: "",
        };
      }
      axios
        .post(`http://localhost:4200/${type}`, register)
        .then(() => {
          alert("Your registeration is done!");
          this.props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (username === "") alert("Enter the username");
      else if (password === "") alert("Enter the password");
      else alert("Enter the phone number");
    }
  };
  render() {
    return (
      <div className="signUpInputs">
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <h2>SIGNUP</h2>
          <br></br>
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              aria-describedby="emailHelp"
              value={this.state.userId}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
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
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              aria-describedby="emailHelp"
              onChange={this.onNumberchange}
            />
          </div>
          <button type="submit" className="btn signUpbtn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
