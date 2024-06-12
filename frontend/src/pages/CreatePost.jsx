import React, { useState, useRef } from "react";
import { FaUpload } from "react-icons/fa";
import axios from 'axios';
import SidebarLayout from "../components/SidebarLayout";

export default function CreatePost() {
  const [files, setFiles] = useState([null, null, null]);
  const [description, setDescription] = useState('');
  const fileInputs = useRef(Array.from({ length: 3 }).map(() => React.createRef()));

  const handleFileChange = (event, index) => {
    const uploadedFile = event.target.files[0];
    const newFiles = [...files];
    newFiles[index] = uploadedFile;
    setFiles(newFiles);
    event.target.value = "";
  };

  const handleCardClick = (index) => {
    fileInputs.current[index].current.click();
  };

  const handlePost = () => {
    const formData = new FormData();
    formData.append('description', description);
    files.forEach((file, index) => {
      if (file) {
        formData.append(`file${index + 1}`, file);
      }
    });

    axios.post('/posts', formData)
      .then(response => {
        console.log('Post created:', response.data);
        // Optionally, clear form or perform any other action after successful post creation
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  const renderCard = (index) => {
    const file = files[index];

    return (
      <div
        className="card"
        key={index}
        style={{
          height: "330px",
          width: "300px",
          marginLeft: index > 0 ? "30px" : "0",
          cursor: "pointer",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onClick={() => handleCardClick(index)}
      >
        {file ? (
          file.type.includes("image") ? (
            <img src={URL.createObjectURL(file)} alt="Uploaded File" style={{ width: "100%", height: "100%" }} />
          ) : (
            <video src={URL.createObjectURL(file)} style={{ width: "100%", height: "100%" }} controls />
          )
        ) : (
          <FaUpload size={48} />
        )}
        <label style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}>
          {file ? file.name : "Upload File"}
        </label>
        <input
          type="file"
          ref={fileInputs.current[index]}
          accept={index === 0 ? "image/*" : "image/*, video/*"}
          style={{ display: "none" }}
          onChange={(event) => {
            const uploadedFile = event.target.files[0];
            handleFileChange(event, index);
          }}
        />
      </div>
    );
  };

  return (
    <div className="App">
      <SidebarLayout />

      <div className="content p-5" style={{ marginTop: "60px", marginLeft: "350px" }}>
        <div className="mb-5" style={{ marginRight: "800px", marginTop: "-10px" }}>
          <h1>Create Post</h1>
        </div>

        <div className="card" style={{ height: "710px", width: "900px" }}>
          <div>
            <div className="d-flex p-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <React.Fragment key={index}>
                  {renderCard(index)}
                </React.Fragment>
              ))}
            </div>

            <div>
              <div className="mb-2" style={{ marginRight: "690px" }}>
                <label className="fs-5">Description :</label>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "800px", height: "100px" }} />
            </div>

            <div className="d-flex align-items-start mt-4" style={{ marginLeft: "50px" }}>
              <button className="btn btn-primary" onClick={handlePost}>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
