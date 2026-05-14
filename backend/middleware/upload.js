const multer = require("multer");


// STORAGE CONFIGURATION

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    const uniqueName =

      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);

  }

});


// FILE FILTER

const fileFilter = (req, file, cb) => {

  if (

    file.mimetype === "image/jpeg" ||

    file.mimetype === "image/png" ||

    file.mimetype === "image/jpg"

  ) {

    cb(null, true);

  } else {

    cb(new Error("Only image files allowed"), false);

  }

};


// MULTER CONFIG

const upload = multer({

  storage,

  fileFilter

});

module.exports = upload;