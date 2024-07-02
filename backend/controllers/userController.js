const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync")

const getUsers = catchAsync(async (req, res) => {
  try {
    const users = await User.find({role:{$ne:1}});
    if (!users) {
      res.send({
        error,
        message: "Users not found!",
      });
    }
    if (users){
      console.log("user yes")
    }
    res.status(200).send({
      message: "Users fetch successfull",
      data:{
        users
      }
    });
  } catch (error) {
    console.log(error)
    res.send({
      error,
      message: "Error in retriving users",
    });
  }
});

module.exports = { getUsers };
