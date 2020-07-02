import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  loadAllPosts,
  likePost,
  unlikePost,
  makeComment,
  deletePost,
  deleteComment,
} from "../actions/profile";
import { clearUser } from "../actions/user";
function Home({
  loadAllPosts,
  allPosts: { allPosts },
  likePost,
  unlikePost,
  makeComment,
  user: { user },
  deletePost,
  deleteComment,
  clearUser,
}) {
  const [comment, setcomment] = useState("");
  useEffect(() => {
    loadAllPosts();
    return () => {
      clearUser();
    };
  }, []);
  const renderAllPosts = () => {
    return !allPosts ? (
      <div>loading</div>
    ) : (
      allPosts.map((p, index) => (
        <div className="card home-card" key={index}>
          <h5 style={{ padding: "6px" }}>
            <Link
              to={
                p.postedBy._id === user._id
                  ? "/profile"
                  : `profile/${p.postedBy._id}`
              }
            >
              {p.postedBy.name}
            </Link>
            {p.postedBy._id === user._id && (
              <span style={{ float: "right" }}>
                <i className="material-icons" onClick={() => deletePost(p._id)}>
                  delete
                </i>
              </span>
            )}
          </h5>{" "}
          <div className="card-image">
            <img src={p.photo} alt="" />
          </div>
          <div className="card-content">
            <i className="material-icons">favorite</i>
            <i className="material-icons" onClick={() => likePost(p._id)}>
              thumb_up
            </i>
            <i className="material-icons" onClick={() => unlikePost(p._id)}>
              thumb_down
            </i>
            <h6>{p.likes.length} likes</h6>
            <h6>{p.title}</h6>
            <p>{p.body}</p>
            {p.comments.map((item, index) => (
              <h6 key={index}>
                <span style={{ fontWeight: "500" }}>{item.postedBy.name}</span>{" "}
                {item.text}
                {item.postedBy._id === user._id ||
                  (p._id === user._id && (
                    <span style={{ float: "right" }}>
                      <i
                        className="material-icons"
                        onClick={() => deleteComment(item._id, p._id)}
                      >
                        delete
                      </i>
                    </span>
                  ))}
              </h6>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();

                makeComment(e.target[0].value, p._id);
                setcomment("");
              }}
            >
              <input
                type="text"
                placeholder="comment"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
              />
            </form>
          </div>
        </div>
      ))
    );
  };

  return <div className="home">{renderAllPosts()}</div>;
}
Home.propTypes = {
  allPosts: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  allPosts: state.profile,
  user: state.user,
});
export default connect(mapStateToProps, {
  loadAllPosts,
  likePost,
  unlikePost,
  makeComment,
  deletePost,
  deleteComment,
  clearUser,
})(Home);
