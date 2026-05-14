import { useState } from "react";
import axios from "axios";

function BlogCard({ blog, fetchBlogs }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  const deleteBlog = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blog._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Blog Deleted");
      fetchBlogs();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Delete Failed"
      );
    }
  };

  const updateBlog = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${blog._id}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Blog Updated");
      setIsEditing(false);
      fetchBlogs();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Update Failed"
      );
    }
  };

  const addComment = async () => {
    if (!comment.trim()) {
      alert("Please write a comment");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/blogs/comment/${blog._id}`,
        { text: comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Comment Added");
      setComment("");
      fetchBlogs();
    } catch (error) {
      alert("Comment Failed");
    }
  };

  return (
    <div
      className="card mb-4 border-0"
      style={{
        borderRadius: "22px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        transition: "0.3s",
      }}
    >
      {blog.image && !isEditing && (
        <img
          src={`http://localhost:5000/uploads/${blog.image}`}
          alt={blog.title}
          style={{
            width: "100%",
            height: "320px",
            objectFit: "cover",
          }}
        />
      )}

      <div className="p-4">
        {isEditing ? (
          <>
            <h4 className="fw-bold mb-3">✏️ Update Blog</h4>

            <input
              className="form-control mb-3 p-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ borderRadius: "12px" }}
            />

            <textarea
              className="form-control mb-3 p-3"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ borderRadius: "12px" }}
            />

            <button className="btn btn-success me-2 px-4" onClick={updateBlog}>
              Save Changes
            </button>

            <button
              className="btn btn-secondary px-4"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h3 className="fw-bold" style={{ color: "#333" }}>
                {blog.title}
              </h3>

              <span
                className="badge"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontSize: "13px",
                  padding: "8px 12px",
                  borderRadius: "20px",
                }}
              >
                Blog
              </span>
            </div>

            <p style={{ color: "#555", lineHeight: "1.7" }}>
              {blog.content}
            </p>

            <div className="mb-3">

  <small className="text-muted d-block">
    👤 By: <b>{blog.user?.name || "User"}</b>
  </small>

  <small className="text-muted">
    📅 Created:
    {" "}
    {new Date(blog.createdAt).toLocaleDateString()}
  </small>

</div>

            <div className="d-flex gap-2 mb-4">
              <button
                className="btn px-4"
                style={{
                  backgroundColor: "#ffc107",
                  color: "#222",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Update
              </button>

              <button
                className="btn px-4"
                style={{
                  backgroundColor: "#ff4b5c",
                  color: "white",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}
                onClick={deleteBlog}
              >
                🗑 Delete
              </button>
            </div>

            <div
              className="p-3"
              style={{
                backgroundColor: "#f8f9ff",
                borderRadius: "18px",
              }}
            >
              <h5 className="fw-bold mb-3">💬 Comments</h5>

              <div className="d-flex gap-2 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ borderRadius: "20px" }}
                />

                <button
                  className="btn btn-primary px-4"
                  style={{ borderRadius: "20px" }}
                  onClick={addComment}
                >
                  Add
                </button>
              </div>

              {blog.comments?.length > 0 ? (
                blog.comments.map((c) => (
                  <div
                    key={c._id}
                    className="p-3 mb-2"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "14px",
                      borderLeft: "5px solid #667eea",
                    }}
                  >
                    <p className="mb-1">{c.text}</p>
                    <small className="text-muted">
                      By: {c.user?.name || "User"}
                    </small>
                  </div>
                ))
              ) : (
                <p className="text-muted mb-0">No comments yet</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BlogCard;