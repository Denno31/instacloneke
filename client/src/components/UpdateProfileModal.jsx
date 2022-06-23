import React from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const UpdateProfileModal = ({ modalIsOpen, closeModal }) => {
  let subtitle;
  const [username, setUserName] = React.useState("");
  const [image, setImage] = React.useState("");
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update Profile</h2>

        <form>
          <input
            type="text"
            placeholder="title"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
              <span>upload image</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button
            type="submit"
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
          >
            update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateProfileModal;
