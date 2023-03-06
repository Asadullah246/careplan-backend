const express = require("express");
const {
  createNewTemplate,
  getTemplateList,
  getTemplateByType,
  updateTemp,
  deleteTemp,
  getTempById,
} = require("../templates/templates.controller");
const router = express.Router();

const { isAuthenticated } = require("../user/user.controller");
const { protectedTo } = require("../utils/protectedTo");

router.all(isAuthenticated);

router.route("/").post(createNewTemplate).get(getTemplateList);
router.route("/type/:type").get(getTemplateByType);
router.route("/:id").get(getTempById).patch(updateTemp).delete(deleteTemp);

module.exports = router;
