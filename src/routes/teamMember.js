const express = require("express");
const {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../user/team.controller");
const { isAuthenticated } = require("../user/user.controller");
const { isLoggedIn } = require("../utils/auth");
const { protectedTo } = require("../utils/protectedTo");
const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, protectedTo("team-member"), getTeamMembers)
  .post(isAuthenticated, protectedTo(), addTeamMember);
router
  .route("/:tid")
  .patch(isAuthenticated, protectedTo(), updateTeamMember)
  .delete(isAuthenticated, protectedTo(), deleteTeamMember);

  module.exports = router;