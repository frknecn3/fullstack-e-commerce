const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} = require("../controller/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//! routing

// KAYDOLMA // POST METHOD
router.post("/register", registerController);

//LOGIN / GİRİŞ POST METHOD

router.post("/login", loginController);

// forgot password // şifremi unuttum

router.post("/forgot-password", forgotPasswordController);

// test route

router.get("/test", requireSignIn, isAdmin, testController);

// protected user route

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
module.exports = router;
