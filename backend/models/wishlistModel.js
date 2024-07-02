const { default: mongoose } = require("mongoose");

const WishListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = WishList;
