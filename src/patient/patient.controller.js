const {
  findAllPatient,
  updatePrimaryInsurance,
  updateSecondaryInsurance,
  addPatient,
  findPatientByEmail,
  findPatient,
  updatePatient,
} = require("./patient.service");
const insuranceService = require("../insurance/insurance.service");
const { updateUser, findUserById } = require("../user/user.service");
const insuranceModel = require("../insurance/insurance.model");

module.exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await findAllPatient();
    return res.status(200).json({
      patients,
    });
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      data: null,
      token: null,
      message: "something went wrong",
    });
  }
};

module.exports.findAPatient = async (req, res) => {
  try {
    console.log(req.params.pid);
    const patient = await findPatient(req.params.pid);
    return res.status(200).json({
      patient,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      message: "wrong information!",
    });
  }
};

module.exports.updateAPatient = async (req, res) => {
  try {
    const patient = await updatePatient(req.params.pid, req.body);
    return res.status(200).json({
      patient,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      message: "wrong information!",
    });
  }
};

module.exports.addNewPatient = async (req, res, next) => {
  try {
    const existing = await findPatientByEmail(req.body.email);
    if (existing)
      return res
        .status(409)
        .json({ error: true, message: "Email already exists.." });
    delete req.body.role;
    delete req.body.permissions;
    const patient = await addPatient(req.body);
    delete patient.password;
    return res.status(200).json({
      patient,
    });
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      message: "something went wrong",
    });
  }
};

module.exports.addPrimaryInsurance = async (req, res) => {
  try {
    const { primary } = req.body;
    const { primaryInsurance } = req.user;
    const { pid } = req.params;
    if (primaryInsurance)
      return res.status(401).json({
        message: "Already has a primary insurance",
      });
    const saveInsurance = await insuranceService.saveInsurance(primary);
    const patient = await updatePrimaryInsurance(pid, saveInsurance._id);

    return res.status(201).json({
      message: "Primary insurance added",
      primary: saveInsurance,
      patient,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({
      error: e.message,
      message: "request failed",
    });
  }
};

module.exports.addSecondaryInsurance = async (req, res) => {
  try {
    const { secondary } = req.body;
    const { secondaryInsurance } = req.user;
    const { pid } = req.params;
    console.log(req.body);
    if (secondaryInsurance)
      return res.status(401).json({
        message: "Already has a primary insurance",
      });
    const saveInsurance = await insuranceService.saveInsurance(secondary);
    const patient = await updateSecondaryInsurance(pid, saveInsurance._id);

    return res.status(201).json({
      message: "Secondary insurance added",
      primary: saveInsurance,
      patient,
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({
      error: e.message,
      message: "request failed",
    });
  }
};

// insurance finding

module.exports.findInsurance = async (req, res) => {
  try {
    const insurance = await insuranceModel.findById(req.params.iid);
    return res.status(200).json({
      insurance,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
      message: "something went on finding insurance",
    });
  }
};

module.exports.updateInsurance = async (req, res) => {
  try {
    console.log("up", req.params.iid, req.body);
    const insurance = await insuranceModel.findByIdAndUpdate( 
      req.params.iid,
      req.body.primary
    );
    // const insurance=await insuranceModel.updateOne( mongoose.Types.ObjectId(req.params.iid), req.body);

    return res.status(201).json({
      insurance,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
      message: "something went on updating insurance",
    });

  }
};
