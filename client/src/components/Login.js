import React, { useState } from "react";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { connect } from "react-redux";
import { login } from "../actions/user";
const Login = ({ history, login }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const postData = async () => {
    try {
      const result = await fetch("/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await result.json();
      console.log(res);
      if (res.error) {
        M.toast({ html: res.error, classes: "#c62828 red darken-3" });
      } else {
        M.toast({ html: res.message, classes: "#43a047 green darken-1" });
        localStorage.setItem("jwt", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        login(res.user);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>InstaClone</h2>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten"
          onClick={() => postData()}
        >
          Login
        </button>
        <h5>
          <Link to="/signup">Don't have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default connect(null, { login })(Login);
