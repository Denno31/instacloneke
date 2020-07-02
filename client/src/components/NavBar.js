import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "../actions/user";
import PropTypes from "prop-types";

function NavBar({ user: { user }, clearUser }) {
  const history = useHistory();
  const renderList = () => {
    if (user) {
      return [
        <li key={0}>
          <Link to="/profile">Profile</Link>
        </li>,
        <li key={1}>
          <Link to="/create">Create Post</Link>
        </li>,
        <li key={2}>
          {" "}
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              clearUser();
              history.push("/login");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key={0}>
          <Link to="/login">Login</Link>
        </li>,
        <li key={1}>
          <Link to="/signup">SignUp</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={user ? "/" : "/login"} className="brand-logo">
          InstaClone
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  clearUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { clearUser })(NavBar);
