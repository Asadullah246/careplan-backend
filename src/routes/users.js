const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  refreshToken,
  isAuthenticated,
  getCurrentUser,
  changePassword,
  updateUser,
  resetPasswordEmail,
  resetPassword,
} = require("../user/user.controller");

router.get("/ping", (req, res) => res.send("Server is running"));
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/refresh", refreshToken);
router.patch("/update-password", isAuthenticated, changePassword);
router.post("/reset-password", resetPasswordEmail);
router.post("/reset-pass/:token", resetPassword);
router.patch("/update", isAuthenticated, updateUser);

router.get("/me", isAuthenticated, getCurrentUser);
module.exports = router;
