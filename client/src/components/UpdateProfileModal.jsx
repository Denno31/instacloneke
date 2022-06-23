import React from "react";
import Modal from "react-modal";
import M from "materialize-css";

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
Modal.setAppElement("#root");
const UpdateProfileModal = ({
  modalIsOpen,
  closeModal,
  name,
  id,
  loadLoggedInUser,
}) => {
  let subtitle;
  const [username, setUserName] = React.useState(name);
  const [image, setImage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instaclone");
    data.append("cloud_name", "dm7tddlog");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dm7tddlog/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const jsonData = await res.json();
      console.log("json data>>>>", jsonData);
      setUrl(jsonData.url);

      console.log("the url>>>>>>", url);
      console.log("url two>>>>", jsonData.url);

      const result = await fetch(`/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          name: username,
          profileImage: jsonData.url,
        }),
      });
      let jsonResult = await result.json();
      if (jsonResult.error) {
        M.toast({ html: jsonResult.error, classes: "#c62828 red darken-3" });
        setLoading(false);
      } else {
        M.toast({
          html: jsonResult.message,
          classes: "#43a047 green darken-1",
        });

        localStorage.setItem("user", JSON.stringify(jsonResult.user));
        loadLoggedInUser();
        setLoading(false);
        closeModal();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update Profile</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
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
            disabled={loading}
            type="submit"
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
          >
            {loading ? "updating" : "update"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateProfileModal;
