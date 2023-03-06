const express = require("express");
const {
  getAllPatients,
  primaryInsurance,
  secondaryInsurance,
  addNewPatient,
  addPrimaryInsurance,
  findAPatient,
  addSecondaryInsurance,
  updateInsurance,
  findInsurance,
  updateAPatient,
} = require("../patient/patient.controller");
const { isAuthenticated } = require("../user/user.controller");
const { protectedTo } = require("../utils/protectedTo");
const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, protectedTo("patient"), getAllPatients)
  .post(isAuthenticated, protectedTo("patient"), addNewPatient);

router
  .route("/:pid")
  .get(isAuthenticated, findAPatient)
  .patch(isAuthenticated, updateAPatient);

router.post(
  "/primaryinsurance/:pid",
  isAuthenticated,
  protectedTo("insurance-tab"),
  addPrimaryInsurance
);

// router.post('/primary-insurance', isAuthenticated, addPrimaryInsurance);

router.post(
  "/secondaryinsurance/:pid",
  isAuthenticated,
  protectedTo("insurance-tab"),
  addSecondaryInsurance
);
router
  .route("/insurance/:iid")
  .patch(isAuthenticated, protectedTo("insurance-tab"), updateInsurance)
  .get(isAuthenticated, protectedTo("insurance-tab"), findInsurance);

module.exports = router;
