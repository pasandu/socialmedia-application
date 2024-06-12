import React, { useState, useRef } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import SidebarLayout from "../components/SidebarLayout";
import Modal from '../components/Modal';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const fileInput = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    event.target.value = "";
  };

  const handleCardClick = () => {
    fileInput.current.click();
  };

  const handlePost = () => {
    const formData = new FormData();
    formData.append("description", description);

    if (file) {
      formData.append("image", file);
    }

    axios
      .post("http://localhost:8080/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Post created:", response.data);
        setShowModal(true);
        setFile(null);
        setDescription("");
      })
      .catch((error) => {
        console.error("Error creating post:", error.response.data);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <SidebarLayout />

      <div className="content p-3" style={{ marginTop: "60px", marginLeft: "350px" }}>
        <div className="mb-5" style={{ marginRight: "800px", marginTop: "-10px" }}>
          <h1>Create Post</h1>
        </div>

        <div className="card shadow" style={{ height: "710px", width: "900px" }}>
          <div>
            <div className="d-flex justify-content-center p-5 ">
              <div
                className="card"
                style={{
                  height: "330px",
                  width: "300px",
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleCardClick}
              >
                {file ? (
                  file.type.includes("image") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded File"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(file)}
                      style={{ width: "100%", height: "100%" }}
                      controls
                    />
                  )
                ) : (
                  <FaUpload size={48} />
                )}
                <label
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {file ? file.name : "Upload File"}
                </label>
                <input
                  type="file"
                  ref={fileInput}
                  accept="image/*, video/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div>
              <div className="mb-2" style={{ marginRight: "690px" }}>
                <label className="fs-5">Description :</label>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "800px", height: "100px" }}
              />
            </div>

            <div className="d-flex align-items-start mt-4" style={{ marginLeft: "50px" }}>
              <button className="btn btn-primary" onClick={handlePost}>
                Post
              </button>
            </div>
          </div>
        </div>

        <Modal isOpen={showModal} onClose={closeModal}>
          <p>Your post has been created successfully!</p>
        </Modal>
      </div>
    </div>
  );
}