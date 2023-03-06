const express = require("express");
const {
  getCodeList,
  createNewCode,
  getACode,
  codeUpdate,
  deleteACode,
  findCodeByQuery,
} = require("../codes/codes.controller");
const router = express.Router();

const { isAuthenticated } = require("../user/user.controller");
const { protectedTo } = require("../utils/protectedTo");

router
  .route("/")
  .get(isAuthenticated, getCodeList)
  .post(isAuthenticated, protectedTo("fee-schedules"), createNewCode)
  .patch(isAuthenticated, findCodeByQuery);

router
  .route("/:id")
  .get(isAuthenticated, getACode)
  .patch(isAuthenticated, protectedTo("fee-schedules"), codeUpdate)
  .delete(isAuthenticated, protectedTo("fee-schedules"), deleteACode);

module.exports = router;
