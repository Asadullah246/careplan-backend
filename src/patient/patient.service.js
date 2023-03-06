const Patient = require("../patient/patient.model");

module.exports.addPatient = async (patientData) => {
  return await Patient.create(patientData);
};

module.exports.findPatient = async (pid) => {
  return await Patient.findById(pid);
};

module.exports.updatePatient = async (pid, info) => {
  return await Patient.findByIdAndUpdate(pid, info);
};

module.exports.findPatientByEmail = async (email) => {
  return await Patient.findOne({ email: email });
};

module.exports.findAllPatient = async () => {
  return await Patient.find({ }, { createdAt: 0, updatedAt: 0 });
};

module.exports.updatePrimaryInsurance = async (pid, primaryInsurance) => {
  return await Patient.findByIdAndUpdate(pid, { primaryInsurance }, { runvalidators: true, new: true});
};

module.exports.updateSecondaryInsurance = async (pid, secondaryInsurance) => {
  return await Patient.findByIdAndUpdate(pid, { secondaryInsurance }, { runvalidators: true, new: true});
};
