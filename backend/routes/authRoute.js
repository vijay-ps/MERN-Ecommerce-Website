const express = require("express");
const authController = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// Route for user registration
router.post("/register", authController.register);

// Route for user login
router.post("/login", authController.login);

router.get("/test", requireSignIn, isAdmin, authController.test);
// Export the router

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
module.exports = router;
