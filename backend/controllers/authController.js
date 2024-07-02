const User = require("../models/userModel.js");
const catchAsync = require("../utils/catchAsync");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// login
const login = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User Not Found",
      });
    }

    console.log(user);

    const isMatch = await comparePassword(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).send({
        status: false,
        message: "Invalid Password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).send({
      status: true,
      message: "Login Success",
      user: {
        _id:user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
});

// register
const register = catchAsync(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).send({
        status: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await hashPassword(req.body.password);

    const newUser = new User({ ...req.body, password: hashedPassword });

    await newUser.save();

    res.status(201).send({
      status: true,
      message: "User Register Success",
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message,
      stack: err.stack,
    });
  }
});

// test
const test = catchAsync(async (req, res) => {
  try {
    res.send({
      status: true,
      message: "Protected",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
});

module.exports = { login, register, test };
