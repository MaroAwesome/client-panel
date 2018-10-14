import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class AppNavbar extends Component {
  state = {
    isAuth: false
  };
  logout = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };
  static getDerivedStateFromProps(props, state) {
    const { auth, firebase } = props;
    if (auth.uid) {
      console.log(firebase.auth().currentUser);

      return { isAuth: true };
    } else {
      console.log(auth);
      return { isAuth: false };
    }
  }
  render() {
    const { isAuth } = this.state;
    const { auth } = this.props;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain ">
            <ul className="navbar-nav mr-auto">
              {isAuth ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
              ) : null}
            </ul>
            {isAuth ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {auth.displayName}
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={this.logout}>
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AppNavbar);
