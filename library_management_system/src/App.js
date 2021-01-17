import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import LinkError from "./components/LinkError";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="/ChangePassword" component={ChangePassword} />
          <Route path="/Home" component={Home} />
          <Route path="**" component={LinkError} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
