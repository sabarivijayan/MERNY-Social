import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import CreatePost from './CreatePost'; // Import the component for creating/editing a post

function DropdownMenu({ postId }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  const handlePost = () => {
    setShowModal(true); // Open the modal for editing
  }

  const handleDeletePost = () => {
    const postIdString = postId.toString();
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");

    if (confirmDelete) {
      fetch(`http://localhost:5000/api/v1/posts/${postIdString}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}`
        }
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      {showModal && <CreatePost postId={postId} onClose={() => setShowModal(false)} />} {/* Render the CreatePost component when the modal is open */}
      <Dropdown className='drop-down' style={{ display: 'flex', justifyContent: "flex-end", position: 'absolute', top: 20, right: 0 }}>
        <Dropdown.Toggle variant="light" id="dropdown1" style={{ backgroundColor: 'transparent', border: "none" }}>
          <h5>...</h5>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handlePost}>
            <i className="material-icons">create</i>Edit Post
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDeletePost}>
            <i className="material-icons">delete</i>Delete Post
          </Dropdown.Item>
          <Dropdown.Item href="/copyLink">
            <i className="material-icons">content_copy</i>CopyLink
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropdownMenu;
