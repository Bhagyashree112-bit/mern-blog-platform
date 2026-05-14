const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  addComment,
} = require("../controllers/blogController");

// CREATE BLOG WITH IMAGE
router.post("/", protect, upload.single("image"), createBlog);

// GET ALL BLOGS
router.get("/", getBlogs);

// UPDATE BLOG
router.put("/:id", protect, upload.single("image"), updateBlog);

// DELETE BLOG
router.delete("/:id", protect, deleteBlog);

// ADD COMMENT
router.post("/comment/:id", protect, addComment);

module.exports = router;