const express = require("express");
const {
  creatingFeeSchedule,
  updateFSchedule,
  getFeeSchedule,
  feeSchedules,
  deleteFSchedule,
  getDefaultFS,
  setDefaultFS,
  findScheduleByQuery,
} = require("../feeSchedule/feeSchedule.controller");
const {
  getSalesTax,
  updateSalexTax,
  creatingSalesTax,
} = require("../feeSchedule/salesTax/salesTax.controller");
const { isAuthenticated } = require("../user/user.controller");
const { protectedTo } = require("../utils/protectedTo");
const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, protectedTo("fee-schedules"), creatingFeeSchedule)
  .get(isAuthenticated, feeSchedules)
  .patch(isAuthenticated, findScheduleByQuery);

router.route("/default").get(isAuthenticated, getDefaultFS);

router.route("/default/:fid").get(isAuthenticated, setDefaultFS);

router.route("/salestax").get(isAuthenticated, getSalesTax);
// .post(isAuthenticated, creatingSalesTax);

router.route("/salestax/:stid").patch(isAuthenticated, updateSalexTax);

router
  .route("/:fid")
  .get(isAuthenticated, protectedTo("fee-schedules"), getFeeSchedule)
  .patch(isAuthenticated, protectedTo("fee-schedules"), updateFSchedule)
  .delete(isAuthenticated, protectedTo("fee-schedules"), deleteFSchedule);

module.exports = router;
