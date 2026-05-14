const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// ✅ REGISTER USER

const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK EMPTY FIELDS

    if (!name || !email || !password) {

      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // CHECK EXISTING USER

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });
    }

    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER

    const user = await User.create({

      name,

      email,

      password: hashedPassword

    });

    res.status(201).json({

      message: "User registered successfully",

      user: {

        id: user._id,

        name: user.name,

        email: user.email

      }

    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};


// ✅ LOGIN USER

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK USER

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // GENERATE TOKEN

    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "1d" }

    );

    res.json({

      message: "Login successful",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email

      }

    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};


// ✅ EXPORTS

module.exports = {

  registerUser,

  loginUser

};