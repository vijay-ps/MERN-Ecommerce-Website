const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Enter Your Email"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Enter Your Password"],
      minlength: 8,
      select: false,
    },
    name: {
      type: String,
      required: [true, "Enter Your name"],
      trim: true,
    },
    phone:{
      type:String,
      required:true
    },
    address:{
      type:String,
      required:true,
    },
    role: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
