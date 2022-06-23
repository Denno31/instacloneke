import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { loadPosts } from "../actions/profile";
import { loadLoggedInUser } from "../actions/user";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import UpdateProfileModal from "./UpdateProfileModal";

const Profile = ({
  loadPosts,
  posts: { posts },
  user: { user },
  loadLoggedInUser,
}) => {
  const { userid } = useParams();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    console.log("in profile");
    loadPosts();
    loadLoggedInUser();
  }, [userid]);
  const loadImages = () => {
    return posts.map((p, index) => (
      <img src={p.photo} alt="" key={index} className="item" />
    ));
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
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
        <div className="profile-image">
          <img
            src="https://images.unsplash.com/photo-1591883307500-9072e99aff62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1535&q=80"
            alt=""
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
          />

          <i className="small material-icons" onClick={openModal}>
            edit
          </i>
        </div>
        <div>
          <h4>{user ? user?.name : "loading..."}</h4>
          <h6>{user ? user?.email : "loading..."}</h6>
          <div
            style={{
              display: "flex",
              width: "108%",
              justifyContent: "space-between",
            }}
          >
            <h6>{posts?.length} posts</h6>
            {!user ? (
              ""
            ) : (
              <Fragment>
                <h6>{user?.followers?.length} followers</h6>
                <h6>{user?.following?.length} following</h6>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="gallery">{loadImages()}</div>
      <UpdateProfileModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};
Profile.propTypes = {
  posts: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  posts: state.profile,
  user: state.user,
});
export default connect(mapStateToProps, { loadPosts, loadLoggedInUser })(
  Profile
);
