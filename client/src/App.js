import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { store } from "./store";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreatePost from "./components/screens/CreatePost";
import { login, loadLoggedInUser } from "./actions/user";
import UserProfile from "./components/UserProfile";
const Routing = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      store.dispatch(loadLoggedInUser());
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/profile" component={Profile}></Route>
      <Route exact path="/Login" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/create" component={CreatePost}></Route>
      <Route exact path="/profile/:userid" component={UserProfile}></Route>
    </Switch>
  );
};
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
