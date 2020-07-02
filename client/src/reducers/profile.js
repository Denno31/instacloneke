import {
  LOAD_POSTS,
  LOAD_ALL_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  MAKE_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
} from "../actions/types";
const intialState = {
  posts: [],
  allPosts: [],
  post: {},
};
export default function (state = intialState, { type, payload }) {
  switch (type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: payload,
      };
    case LOAD_ALL_POSTS:
      return {
        ...state,
        allPosts: payload,
      };
    case LIKE_POST:
    case UNLIKE_POST:
    case MAKE_COMMENT:
    case DELETE_COMMENT:
      const newData = state.allPosts.map((item) => {
        if (item._id === payload._id) {
          return payload;
        } else {
          return item;
        }
      });

      return {
        ...state,
        allPosts: newData,
      };
    case DELETE_POST:
      const filteredData = state.allPosts.filter(
        (item) => item._id !== payload._id
      );
      return {
        ...state,
        allPosts: filteredData,
      };
    default:
      return state;
  }
}
