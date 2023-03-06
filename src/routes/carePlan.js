const express = require("express");
const {
  createCarePlan,
  getAllCarePlans,
  getCarePlan,
  deleteCarePlan,
  updateCarePlan,
} = require("../carePlan/carePlan.controller");
const {
  createCarePlanType,
  getAllCarePlanType,
  getCarePlanTypeBySOC,
  updateCarePlanType,
  deleteCarePlanType,
  getCarePlanTypeByID,
  getCarePlanType
} = require("../carePlanType/carePlanType.controller");
const { isAuthenticated } = require("../user/user.controller");
const { protectedTo } = require("../utils/protectedTo");
const router = express.Router();

router
  .route("/type")
  .post(isAuthenticated, createCarePlanType)
  .get(isAuthenticated, getAllCarePlanType)
  .patch(isAuthenticated, getCarePlanType);

router
  .route("/type/:careid")
  .get(isAuthenticated, getCarePlanTypeByID)
  .patch(isAuthenticated, updateCarePlanType)
  .delete(isAuthenticated, deleteCarePlanType);

router
  .route("/")
  .get(isAuthenticated, getAllCarePlans)
  .post(isAuthenticated, createCarePlan);

router
  .route("/:careid")
  .get(isAuthenticated, getCarePlan)
  .delete(isAuthenticated, protectedTo("build-care-plan"), deleteCarePlan)
  .patch(isAuthenticated, updateCarePlan);

module.exports = router;
