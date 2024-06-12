import React, { useState, useEffect } from 'react';
import "../css/SideBar.css";
import SidebarLayout from "../components/SidebarLayout";
import { RiUserFollowLine } from "react-icons/ri";
import axios from 'axios';

const fetchPostImage = async (postId) => {
  try {
    const response = await axios.get(`http://localhost:8080/posts/${postId}/image`, {
      responseType: 'arraybuffer',
    });
    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.error('Error fetching post image:', error);
    return null;
  }
};

const Post = ({ description, postId }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const url = await fetchPostImage(postId);
      setImageUrl(url);
    };

    fetchImage();
  }, [postId]);

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  return (
    <div className="shadow mb-5 mt-3 bg-light rounded" style={{ width: '700px', height: 'auto', marginLeft: '40px' }}>
      <div className="p-3">
        {/* Description */}
        <p>{description}</p>

        {/* Image or Video */}
        {imageUrl && (
          <img src={imageUrl} alt="Post" className="img-fluid rounded" />
        )}

        {/* Like and Comment Section */}
        <div className="mt-3 d-flex align-items-center">
          <button className="btn btn-primary mr-2" onClick={handleLike}>
            <i className="fas fa-thumbs-up"></i> Like ({likes})
          </button>

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="d-flex flex-grow-1 mx-3">
            <div className="form-group mb-0 flex-grow-1 mr-2">
              <input
                type="text"
                className="form-control"
                placeholder="Write a comment..."
                value={newComment}
                onChange={handleCommentChange}
              />
            </div>
            {/* Share Button */}
            <button type="button" className="btn btn-secondary" style={{marginLeft:"15px"}}>
              <i className="fas fa-share"></i> Share
            </button>
          </form>
        </div>

        {/* Comments List */}
        {comments.length > 0 && (
          <div className="mt-3">
            <h6>Comments:</h6>
            <ul className="list-unstyled">
              {comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default function UserProfile() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <SidebarLayout />

      <div
        className="content"
        style={{ marginTop: "60px", marginLeft: "300px" }}
      >
        
        <div className="mt-4" style={{}}>
          <div className="d-flex ">
            <div className="">
              <div
                className="shadow p-3 mb-5 rounded"
                style={{
                  width: "840px",
                  height: "auto",
                  backgroundColor: "#e6e6e6",
                }}
              >
                {posts.map((post) => (
                  <Post
                    key={post.id}
                    description={post.description}
                    postId={post.id}
                  />
                ))}
              </div>
            </div>

            <div>
              <div
                className="shadow p-3 mb-5  rounded"
                style={{
                  width: "300px",
                  height: "600px",
                  marginLeft: "45px",
                  backgroundColor: "#e6e6e6",
                }}
              >
                <h2>Who to Follow</h2>

                <div
                  className="shadow p-3 mb-2 bg-white rounded d-flex mt-4"
                  style={{ width: "auto" }}
                >
                  <div>
                    <img
                      src="./images/img1.jpg"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        marginRight: "20px", // Adjust margin for proper spacing
                      }}
                      alt="User Profile"
                    />
                  </div>

                  <div className="mt-2">
                    <p>Anjana</p>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-primary d-flex align-items-center"
                      style={{ marginLeft: "50px" }}
                    >
                      <RiUserFollowLine
                        style={{ marginRight: "5px", fontSize: "5px" }}
                      />
                      Follow
                    </button>{" "}
                  </div>
                </div>

                <div
                  className="shadow p-3 mb-2 bg-white rounded d-flex mt-4"
                  style={{ width: "auto" }}
                >
                  <div>
                    <img
                      src="./images/img1.jpg"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        marginRight: "20px", // Adjust margin for proper spacing
                      }}
                      alt="User Profile"
                    />
                  </div>

                  <div className="mt-2">
                    <p>Anjana</p>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-primary d-flex align-items-center"
                      style={{ marginLeft: "50px" }}
                    >
                      <RiUserFollowLine
                        style={{ marginRight: "5px", fontSize: "5px" }}
                      />
                      Follow
                    </button>{" "}
                  </div>
                </div>

                <div
                  className="shadow p-3 mb-2 bg-white rounded d-flex mt-4"
                  style={{ width: "auto" }}
                >
                  <div>
                    <img
                      src="./images/img1.jpg"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        marginRight: "20px", // Adjust margin for proper spacing
                      }}
                      alt="User Profile"
                    />
                  </div>

                  <div className="mt-2">
                    <p>Anjana</p>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-primary d-flex align-items-center"
                      style={{ marginLeft: "50px" }}
                    >
                      <RiUserFollowLine
                        style={{ marginRight: "5px", fontSize: "5px" }}
                      />
                      Follow
                    </button>{" "}
                  </div>
                </div>

                <div
                  className="shadow p-3 mb-2 bg-white rounded d-flex mt-4"
                  style={{ width: "auto" }}
                >
                  <div>
                    <img
                      src="./images/img1.jpg"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        marginRight: "20px", // Adjust margin for proper spacing
                      }}
                      alt="User Profile"
                    />
                  </div>

                  <div className="mt-2">
                    <p>Anjana</p>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-primary d-flex align-items-center"
                      style={{ marginLeft: "50px" }}
                    >
                      <RiUserFollowLine
                        style={{ marginRight: "5px", fontSize: "5px" }}
                      />
                      Follow
                    </button>{" "}
                  </div>
                </div>

                <div
                  className="shadow p-3 mb-2 bg-white rounded d-flex mt-4"
                  style={{ width: "auto" }}
                >
                  <div>
                    <img
                      src="./images/img1.jpg"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        marginRight: "20px", // Adjust margin for proper spacing
                      }}
                      alt="User Profile"
                    />
                  </div>

                  <div className="mt-2">
                    <p>Anjana</p>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="btn btn-primary d-flex align-items-center"
                      style={{ marginLeft: "50px" }}
                    >
                      <RiUserFollowLine
                        style={{ marginRight: "5px", fontSize: "5px" }}
                      />
                      Follow
                    </button>{" "}
                  </div>
                </div>

                {/* Other follow suggestions... */}

                <button
                  className="btn btn-primary mt-2"
                  style={{ width: "270px" }}
                >
                  See More ....
                </button>
              </div>

              <div
                className="shadow p-3 mb-5  rounded"
                style={{
                  width: "300px",
                  height: "500px",
                  marginLeft: "45px",
                  backgroundColor: "#e6e6e6",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}