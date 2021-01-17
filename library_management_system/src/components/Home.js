import React from "react";
import { Switch, Route } from "react-router-dom";
import Books from "./Books";
import Nav from "./Nav";
import MembersList from "./MembersList";
import MyBooks from "./MyBooks";
import BookInfo from "./BookInfo";

class Home extends React.Component {
  constructor() {
    super();
    document.title = "Welcome | Roman Library";
  }
  directingToLogin = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <Nav directingToLogin={this.directingToLogin} />
        <Switch>
          <Route path="/Home/Books" component={Books} />
          <Route path="/Home/MyBooks" component={MyBooks} />
          <Route path="/Home/MembersList" component={MembersList} />
          <Route path="/Home/BookInfo/:id" component={BookInfo} />
        </Switch>
      </div>
    );
  }
}
export default Home;
