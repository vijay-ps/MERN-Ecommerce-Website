const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");
dotenv.config();
// protected routes token

const requireSignIn = async (req, res,next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode
    console.log(decode,"*")
    next();
  } catch (error) {
    res.send({success:false,error});
    console.log(error);
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success:false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success:false,
      error,
      message:"Error In Admin Middleware"
    });
  }
};
module.exports = { requireSignIn, isAdmin };
