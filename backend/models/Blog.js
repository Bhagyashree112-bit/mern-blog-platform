const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  // IMAGE

  image: {
    type: String,
    default: ""
  },

  // BLOG OWNER

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // COMMENTS

  comments: [

    {

      text: {
        type: String,
        required: true
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      createdAt: {
        type: Date,
        default: Date.now
      }

    }

  ]

}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);