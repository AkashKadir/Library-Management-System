import React from "react";

class MyBooksMain extends React.Component {
  render() {
    return (
      <div class="card">
        <img
          src={this.props.books.thumbnailUrl}
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    );
  }
}
export default MyBooksMain;
