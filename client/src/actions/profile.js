import {
  LOAD_POSTS,
  LOAD_ALL_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  MAKE_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
} from "../actions/types";

export const loadPosts = () => async (dispatch) => {
  try {
    const result = await fetch("/getSubPost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const resData = await result.json();
    dispatch({
      type: LOAD_POSTS,
      payload: resData.result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const loadAllPosts = () => async (dispatch) => {
  try {
    const result = await fetch("/getSubPost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const resData = await result.json();
    dispatch({
      type: LOAD_ALL_POSTS,
      payload: resData.result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (postId) => async (dispatch) => {
  console.log(postId);
  fetch("/like", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      postId: postId,
    }),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result.result);
      dispatch({
        type: LIKE_POST,
        payload: result.result,
      });
    });
};
export const unlikePost = (postId) => async (dispatch) => {
  console.log(postId);
  fetch("/unlike", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      postId: postId,
    }),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      dispatch({
        type: UNLIKE_POST,
        payload: result.result,
      });
    })
    .catch((err) => console.log(err));
};
export const makeComment = (text, postId) => (dispatch) => {
  console.log("here");
  fetch("/comment", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      postId,
      text,
    }),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result.result);
      dispatch({
        type: MAKE_COMMENT,
        payload: result.result,
      });
    });
};
//delete post
export const deletePost = (postId) => async (dispatch) => {
  fetch(`/deletepost/${postId}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result.result);
      dispatch({
        type: DELETE_POST,
        payload: result.result,
      });
    });
};
export const deleteComment = (commentId, postId) => (dispatch) => {
  fetch(`/deletecomment/${commentId}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      postId,
    }),
  })
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: DELETE_COMMENT,
        payload: data,
      })
    );
};
