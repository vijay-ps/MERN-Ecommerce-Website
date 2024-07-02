const {requireSignIn,isAdmin} = require("../middlewares/authMiddleware")
const userController = require("../controllers/userController")

const express = require("express")

const router = express.Router()

router.get("/",requireSignIn,isAdmin,userController.getUsers)

module.exports = router