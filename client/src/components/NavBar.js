import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "../actions/user";
import PropTypes from "prop-types";

function NavBar({ user: { user }, clearUser }) {
  const history = useHistory();
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    if (!searchQuery) return;
    fetch(`/users/search?name=${searchQuery}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((jsonResult) => {
        console.log(jsonResult);
        setSearchResults(jsonResult);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  const handleRedirect = (uid) => {
    setSearchResults([]);
    setSearchQuery("");
    history.push(`/profile/${uid}`);
  };
  return (
    <>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper white container">
            <div className="logo-nav">
              <Link to={user ? "/" : "/login"} className="brand-logo">
                InstaClone
              </Link>
            </div>
            <div className="search-bar-input">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleChange}
              />{" "}
              {searchResults.length > 0 && (
                <div className="search-results">
                  <div className="">
                    {searchResults.map((result) => (
                      <div
                        onClick={() => handleRedirect(result._id)}
                        key={result._id}
                      >
                        {result.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="serch-input-icon">
                <i className="material-icons">search</i>
              </div>
            </div>

            <div className="">
              <ul id="nav-mobile" className="right">
                {renderList()}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
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
