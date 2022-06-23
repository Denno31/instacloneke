import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadPosts } from "../actions/profile";
import {
  loadUserProfile,
  followUser,
  unfollowUser,
  clearUser,
  clearUserProfile,
} from "../actions/user";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const UserProfile = ({
  posts: { posts },
  user: { user },
  loadUserProfile,
  user: { userProfile, follow },
  followUser,
  unfollowUser,
  clearUserProfile,
}) => {
  const { userid } = useParams();

  useEffect(() => {
    loadUserProfile(userid);
    //checkIfFollowing();
    return () => {
      clearUserProfile();
    };
  }, [userid]);
  const loadImages = () => {
    return !userProfile
      ? "Loading"
      : userProfile.posts.map((p, index) => (
          <img
            style={{ objectFit: "contain" }}
            src={p.photo}
            alt=""
            key={index}
            className="item"
          />
        ));
  };

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            src="https://images.unsplash.com/photo-1591883307500-9072e99aff62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1535&q=80"
            alt=""
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
            }}
          />
        </div>
        {!userProfile ? (
          "loading..."
        ) : (
          <div>
            <h4>{userProfile ? userProfile.user.name : "loading..."}</h4>
            <h6>{userProfile ? userProfile.user.email : "loading..."}</h6>
            <div
              style={{
                display: "flex",
                width: "108%",
                justifyContent: "space-between",
              }}
            >
              <h6>{userProfile ? userProfile.posts.length : ""} posts</h6>
              <h6>{userProfile.user.followers.length} followers</h6>
              <h6>{userProfile.user.following.length} following</h6>
            </div>
            {!follow ? (
              <button
                style={{ margin: "10px" }}
                className="btn waves-effect waves-light #64b5f6 blue lighten"
                onClick={() => {
                  followUser(userProfile.user._id);
                }}
              >
                Follow
              </button>
            ) : (
              <button
                style={{ margin: "10px" }}
                className="btn waves-effect waves-light #64b5f6 blue lighten"
                onClick={() => {
                  unfollowUser(userProfile.user._id);
                }}
              >
                unfollow
              </button>
            )}
          </div>
        )}
      </div>
      <div className="gallery">{loadImages()}</div>
    </div>
  );
};
UserProfile.propTypes = {
  posts: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  posts: state.profile,
  user: state.user,
});
export default connect(mapStateToProps, {
  loadPosts,
  loadUserProfile,
  followUser,
  unfollowUser,
  clearUser,
  clearUserProfile,
})(UserProfile);
