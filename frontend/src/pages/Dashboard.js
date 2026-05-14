import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import BlogForm from "../components/BlogForm";
import BlogCard from "../components/BlogCard";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/blogs"
      );

      setBlogs(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
   <div
  style={{
    minHeight: "100vh",
    backgroundImage:
      "linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }}
>
      <Navbar />

      {/* HERO SECTION */}

      <div className="container py-5">

        <div
          className="text-center text-white p-5 mb-5 rounded"
          style={{
            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          <h1 className="fw-bold mb-3">
            ✨ Welcome to MERN Blog Platform
          </h1>

          <p style={{ fontSize: "18px" }}>
            Create, manage, search, and share your blogs
            with modern MERN stack technology.
          </p>
        </div>

        {/* BLOG FORM */}

        <BlogForm fetchBlogs={fetchBlogs} />

        {/* SEARCH */}

        <div
          className="card p-4 mb-4 border-0"
          style={{
            borderRadius: "20px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3 className="mb-3 fw-bold">
            🔍 Search Blogs
          </h3>

          <input
            type="text"
            className="form-control p-3"
            placeholder="Search blogs by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: "12px",
              border: "2px solid #ddd",
            }}
          />
        </div>

        {/* BLOGS */}

        <h2 className="fw-bold mb-4">
          📚 Latest Blogs
        </h2>

        {filteredBlogs.length > 0 ? (

          filteredBlogs.map((blog) => (

            <BlogCard
              key={blog._id}
              blog={blog}
              fetchBlogs={fetchBlogs}
            />

          ))

        ) : (

          <div
            className="text-center p-5 bg-white rounded"
            style={{
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h4>No blogs found 😔</h4>
          </div>

        )}

      </div>
    </div>
  );
}

export default Dashboard;