const Insurance = require("./insurance.model");

module.exports.saveInsurance = async (insurance) => {
  return await Insurance.create(insurance);
}

module.exports.findInsuranceByUserId = async (userId) => {
  return await Insurance.findOne({ userId });
}
