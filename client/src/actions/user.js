import {
  SIGN_IN,
  CLEAR_USER,
  LOAD_USER_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FETCH_USERS,
  FETCH_USERS_REQUEST,
} from "./types";

export const login = (userData) => (dispatch) => {
  dispatch({
    type: SIGN_IN,
    payload: userData,
  });
};
export const clearUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER,
    payload: null,
  });
};
export const clearUserProfile = () => (dispatch) => {
  dispatch({
    type: "CLEAR_USER_PROFILE",
    payload: null,
  });
};
export const loadUserProfile = (userId) => async (dispatch) => {
  try {
    const result = await fetch(`/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const resData = await result.json();
    dispatch({
      type: LOAD_USER_PROFILE,
      payload: resData,
    });
  } catch (error) {
    console.log(error);
  }
};
export const followUser = (followId) => async (dispatch) => {
  fetch("/follow", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      followId,
    }),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      dispatch({
        type: FOLLOW_USER,
        payload: result,
      });
    });
};
export const unfollowUser = (unfollowId) => async (dispatch) => {
  fetch("/unfollow", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      unfollowId,
    }),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      dispatch({
        type: UNFOLLOW_USER,
        payload: result,
      });
    });
};
export const loadLoggedInUser = () => (dispatch) => {
  fetch("/auth", {
    method: "get",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then((data) => data.json())
    .then((result) => dispatch({ type: SIGN_IN, payload: result }));
};

export const fetchUsers = () => (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  fetch("/users", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then((data) => data.json())
    .then((result) => {
      console.log("fetched users", result);
      dispatch({ type: FETCH_USERS, payload: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
