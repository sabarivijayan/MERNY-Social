import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import M from "materialize-css";
import "../style.css";

function CreatePost() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "merny-app");
    data.append("cloud_name", "djlnbyny1");

    fetch("https://api.cloudinary.com/v1_1/djlnbyny1/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (url) {
      const postData = {
        content: content,
        images: url,
      };

      fetch("http://localhost:5000/api/v1/post", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((data) => {
          // Display a success toast notification
          if (data.error) {
            M.toast({ html: "Success!", classes: "green" });
          }
          // Display an error toast notification
          else {
            M.toast({ html: "create post", classes: "red" });
            navigate("/homepage");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <div
        className="user-icon"
        style={{ padding: "5px", borderRadius: "50%" }}
      >
        <Link to="/profile">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg"
            alt="user-profile"
            className="user-profile"
          />
        </Link>
      </div>
      <Button
        variant="search"
        onClick={handleModalOpen}
        style={{
          width: "700px",
          backgroundColor: "#e9ecef",
          height: "50px",
          flexGrow: "1",
          marginTop: "29px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        Hey!, What are you thinking ?
      </Button>

      <Modal show={showModal}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add form fields for post content */}
          <div>
            <input
              type="text"
              placeholder="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="file-field input-field">
            <div className="btn">
              <i className="material-icons">camera_alt</i>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ width: 600 }}
            onClick={() => postDetails()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreatePost;
