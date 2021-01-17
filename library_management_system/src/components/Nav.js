import React from "react";
import { Link } from "react-router-dom";
import "./css/Nav.css";
import icon from "./images/logo.png";
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("id"),
      reservedBooks: [],
      display: "",
      members: "",
    };
  }
  onLogOut = () => {
    this.props.directingToLogin();
  };
  componentDidMount() {
    if (localStorage.getItem("type") === "librarian") {
      this.setState({ display: "nav-view", members: "" });
    } else {
      this.setState({ display: "", members: "nav-view" });
    }
  }
  render() {
    return (
      <div className="navComponent">
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="*">
            <img
              src={icon}
              width="43"
              height="43"
              className="d-inline-block align-top"
              alt=""
              loading="lazy"
            />
            &nbsp; Roman Library
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className={`${this.state.display} nav-item active`}>
                <Link to="/Home">
                  <a className="nav-link" href="*">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
              <li className={`${this.state.display} nav-item active`}>
                <Link to="/Home/About">
                  <a className="nav-link" href="*">
                    About
                  </a>
                </Link>
              </li>
              <li className={`${this.state.display} nav-item active`}>
                <Link to="/Home/Contact">
                  <a className="nav-link" href="2.com">
                    Contact
                  </a>
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/Home/Books">
                  <a className="nav-link" href="*">
                    Books
                  </a>
                </Link>
              </li>
              <li className={`${this.state.display} nav-item active`}>
                <Link to="/Home/MyBooks">
                  <a className="nav-link" href="*">
                    My Books
                  </a>
                </Link>
              </li>
              <li className={`${this.state.members} nav-item active`}>
                <Link to="/Home/MembersList">
                  <a className="nav-link" href="*">
                    Members
                  </a>
                </Link>
              </li>
            </ul>
            {/* <div className="dropdown mr-1 ">
              <span
                className="btn dropdown-toggle dropdown-button"
                id="dropdownMenuOffset"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-offset="10,20"
              >
                <i class="fas fa-cog"></i>
              </span>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuOffset"
              >
                <Link to="/AshKart/UpdateProfile">
                  <a className="dropdown-item" href="*">
                    Update Your Account
                  </a>
                </Link>
                <Link to="/">
                  <a
                    className="dropdown-item"
                    href="*"
                    onClick={() => this.deleteUser()}
                  >
                    Delete Your Account
                  </a>
                </Link>
                
              </div>
            </div> */}
            <a
              className=" active btn btn-primary"
              onClick={() => this.onLogOut()}
            >
              LogOut
            </a>
          </div>
        </nav>
      </div>
    );
  }
}
export default Nav;
