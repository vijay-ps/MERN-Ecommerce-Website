const productController = require("../controllers/productController")
const authMiddleware = require("../middlewares/authMiddleware")

const express = require("express")
const router = express.Router()

router.get("/",productController.getAllProducts)
router.post("/",authMiddleware.requireSignIn,authMiddleware.isAdmin,productController.addProduct)

router.delete("/:id",authMiddleware.requireSignIn,authMiddleware.isAdmin,productController.deleteProduct)
router.patch("/:id",authMiddleware.requireSignIn,authMiddleware.isAdmin,productController.updateProduct)

router.get("/get-categories",productController.getCategories)




module.exports = router;
