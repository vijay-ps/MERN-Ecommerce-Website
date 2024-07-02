const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { requireSignIn } = require("../middlewares/authMiddleware");
const Wishlist = require("../models/wishlistModel");

router.post(
  "/",
  requireSignIn,
  catchAsync(async (req, res) => {
    try {
      const wishlist = new Wishlist(req.body);
      wishlist.save();
      res.status(200).send("Added Successfully To Wishlist");
    } catch (error) {
      res.send(error);
    }
  })
);
router.get(
  "/:id",
  requireSignIn,
  catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      const wishlist = await Wishlist.find({userId:id});
      if (wishlist.length > 0){
        res.status(201).send({
          status: true,
          message: "Wishlist Fetch Successfull",
          wishlist,
        });
      }else{
        res.status(201).send({
          status: false,
          message:"None Found !"
        });
      }
    } catch (error) {
      res.send({
        status: "failed",
        error,
        message: "Something Went Wrong",
      });
    }
  })
);
router.delete(
  "/:id/:productId",
  requireSignIn,
  catchAsync(async (req, res) => {
    try {
      const { id,productId } = req.params;
      console.log(id,productId)
      const wishlist = await Wishlist.findOneAndDelete({userId:id,productId:productId});
      if (wishlist) {
        res.send({
          status: "Success",
          message: "Deletion Success",
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "Wishlist item not found",
        });
      }
    } catch (error) {
      res.send({
        status: "failed",
        error,
        message: "Something Went Wrong",
      });
    }
  })
);
module.exports = router