const CarePlanType = require("./carePlanType.model");

module.exports.createAnewCarePlanType = async (CarePlanInfo) => {
  return await CarePlanType.create(CarePlanInfo);
};

module.exports.updatePlanType = async (id, CarePlanInfo) => {
  return await CarePlanType.findByIdAndUpdate(id, CarePlanInfo);
};

module.exports.findCarePlanTypeByName = async (query) => {
  return await CarePlanType.find(query);
};

module.exports.findCarePlanTypeByID = async (id) => {
  return await CarePlanType.findById(id);
};

module.exports.findCarePlanTypeBySOC = async (name) => {
  return await CarePlanType.findOne({ s: name });
};

module.exports.findAllCarePlanType = async () => {
  return await CarePlanType.find({});
};

module.exports.deletePlanType = async (id) => {
  return await CarePlanType.findByIdAndDelete(id);
};
