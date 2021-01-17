import React from "react";
import "./css/SignUp.css";
import TypeOfUser from "./TypeOfUser";
import { Switch, Route } from "react-router-dom";
import SignUpInputs from "./SignUpInputs";
import back_img from "./images/boy-holding.jpg";

class SignUp extends React.Component {
  render() {
    document.title = "SignUp | Roman Library";
    const type = localStorage.getItem("type");
    return (
      <div>
        <img className="nav-image" src={back_img} alt="..." />
        <Switch>
          <Route path="/SignUp/" exact component={TypeOfUser} />
          <Route path={`/SignUp/${type}`} component={SignUpInputs} />
        </Switch>
      </div>
    );
  }
}
export default SignUp;
