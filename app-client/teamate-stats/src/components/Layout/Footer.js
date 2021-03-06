import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="site-footer">
        <div className="container">
          <div className="hr hr--top" />
          <p>
            Made with <span role="img">❤</span>️ by{" "}
            <a href="https://github.com/satner">Satner</a>
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
