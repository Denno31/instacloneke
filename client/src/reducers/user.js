import {
  SIGN_IN,
  CLEAR_USER,
  LOAD_USER_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FETCH_USERS,
} from "../actions/types";
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  userProfile: null,
  follow: false,
  users: [],
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        user: payload.user,
      };
    case CLEAR_USER:
      return {
        ...state,
        userProfile: payload,
        user: payload,
      };
    case LOAD_USER_PROFILE:
      const checkFollow = payload.user.followers.find(
        (item) => item === state.user._id
      );
      if (checkFollow) {
        return {
          ...state,
          userProfile: payload,
          follow: true,
        };
      } else {
        return {
          ...state,
          userProfile: payload,
          follow: false,
        };
      }

    case FOLLOW_USER:
      const updatedProfile = {
        ...state.userProfile,
        user: {
          ...state.userProfile.user,
          followers: [
            ...state.userProfile.user.followers,
            payload.following._id,
          ],
        },
      };
      localStorage.setItem("user", JSON.stringify(payload.following));
      return {
        ...state,
        userProfile: updatedProfile,
        follow: true,
        user: payload.following,
      };
    case UNFOLLOW_USER:
      const updateFollowers = state.userProfile.user.followers.filter(
        (item) => item !== state.user._id
      );
      localStorage.setItem("user", JSON.stringify(payload.following));
      console.log(payload.following.following);
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          user: { ...state.userProfile.user, followers: updateFollowers },
        },
        follow: false,
        user: payload.following,
      };
    case FETCH_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
    case "CLEAR_USER_PROFILE":
      return { ...state, userProfile: null };
  }
}
