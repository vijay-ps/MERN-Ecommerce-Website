const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");

// const getAllProducts = catchAsync(async (req, res) => {
//   try {
//     const products = await Product.find({ active: true });
//     if (!products) {
//       res.send({
//         error,
//         message: "No Data Available!",
//       });
//     }

//     res.status(200).send({
//       data: {
//         products,
//       },
//       message: "Success",
//     });
//   } catch (error) {
//     res.status(500).send({
//       error,
//       message: "Some Error Occured",
//     });
//   }
// });

const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = new Product(req.body);
    product.save();

    res.status(201).send({
      status: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    res.send({
      status: "failed",
      error,
      message: "Something Went Wrong",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    product.save();

    res.status(201).send({
      status: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    res.send({
      status: "failed",
      error,
      message: "Something Went Wrong",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    product.save();

    res.status(201).send({
      status: true,
      message: "Product Fetch Successfull",
      product,
    });
  } catch (error) {
    res.send({
      status: "failed",
      error,
      message: "Something Went Wrong",
    });
  }
};

const getCategories = catchAsync(async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    console.log(categories);
    if (!categories) {
      res.send({
        error,
        message: "No Categories can be fetched!",
      });
    }

    res.status(200).json({ categories, message: "Categories Fetch Success" });
  } catch (error) {
    res.send({
      error,
    });
  }
});

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {
      $set: { active: false },
    });
    product.save();

    res.status(201).send({
      status: true,
      message: "Delete Successfull",
    });
  } catch (error) {
    res.send({
      status: "failed",
      error,
      message: "Something Went Wrong",
    });
  }
};

const getAllProducts = catchAsync(async (req, res) => {
  try {
    let query = Product.find();

    if (req.query.sortBy === "price") {
      const sortOrder = req.query.order === "desc" ? -1 : 1;
      query = query.sort({ price: sortOrder });
    } else if (req.query.sortBy === "rating") {
      const sortOrder = req.query.order === "asc" ? 1 : -1;
      query = query.sort({ "rating.rate": sortOrder });
    }

    if (req.query.category) {
      query = query.where({ category: req.query.category });
    }

    if (req.query.search) {
      const searchTerm = req.query.search;
      query = query.where({
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { description: new RegExp(searchTerm, 'i') },
        ],
      });
    }

    const products = await query.exec();

    res.status(200).send({
      data: {
        products,
      },
      message: "Success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  getAllProducts,
  addProduct,
  getCategories,
  updateProduct,
  getProduct,
  deleteProduct,
};
