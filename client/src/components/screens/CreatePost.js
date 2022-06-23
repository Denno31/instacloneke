import React, { useState } from "react";
import M from "materialize-css";
import Loading from "../Loading";
const CreatePost = ({ history }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const postDetails = async () => {
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
      console.log("after await");
      const jsonData = await res.json();
      setUrl(jsonData.url);
      console.log("sadfadfadfadf adfas", url);
      const result = await fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          title,
          photo: jsonData.url,
          body,
        }),
      });
      const jsonResult = await result.json();
      console.log(jsonResult);
      if (jsonResult.error) {
        setLoading(false);
        M.toast({ html: jsonResult.error, classes: "#c62828 red darken-3" });
      } else {
        M.toast({
          html: "posted successfully",
          classes: "#43a047 green darken-1",
        });
        setLoading(false);
        history.push("/");
      }
    } catch (error) {
      console.log("in error");
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div
      className="card input-field"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>upload image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => postDetails()}
        >
          Submit post
        </button>
      )}
    </div>
  );
};

export default CreatePost;
