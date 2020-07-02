import React, { useState } from "react";
import { Link } from "react-router-dom";

import M from "materialize-css";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const postData = async () => {
    const formData = {
      name,
      email,
      password,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await fetch("/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const res = await result.json();
      if (res.error) {
        M.toast({ html: res.error, classes: "#c62828 red darken-3" });
      } else {
        M.toast({ html: res.message, classes: "#43a047 green darken-1" });
        history.push("/login");
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
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          SignUp
        </button>
        <h5>
          <Link to="/login">Already have an account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
