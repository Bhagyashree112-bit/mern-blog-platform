import { useState } from "react";
import axios from "axios";

function BlogForm({ fetchBlogs }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const createBlog = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!title || !content) {
        alert("Please enter title and content");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await axios.post("http://localhost:5000/api/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog Created Successfully");

      setTitle("");
      setContent("");
      setImage(null);

      fetchBlogs();
    } catch (error) {
      alert("Error creating blog");
    }
  };

  return (
    <div
      className="card p-4 mb-5 border-0"
      style={{
        borderRadius: "22px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
      }}
    >
      <h3 className="fw-bold mb-2">📝 Create New Blog</h3>

      <p className="text-muted mb-4">
        Share your thoughts, upload an image, and publish your blog.
      </p>

      <input
        type="text"
        placeholder="Enter blog title..."
        className="form-control mb-3 p-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          borderRadius: "14px",
          border: "2px solid #e3e6f0",
        }}
      />

      <textarea
        placeholder="Write your blog content..."
        className="form-control mb-3 p-3"
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          borderRadius: "14px",
          border: "2px solid #e3e6f0",
        }}
      />

      <input
        type="file"
        className="form-control mb-4 p-3"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{
          borderRadius: "14px",
          border: "2px solid #e3e6f0",
        }}
      />

      {image && (
        <p className="text-success fw-bold">
          ✅ Selected Image: {image.name}
        </p>
      )}

      <button
        className="btn text-white fw-bold"
        onClick={createBlog}
        style={{
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "25px",
          padding: "12px 28px",
          border: "none",
        }}
      >
        🚀 Publish Blog
      </button>
    </div>
  );
}

export default BlogForm;