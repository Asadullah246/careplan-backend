const CarePlan = require("./carePlan.model");

module.exports.createNewCarePlan = async (info) => {
  return await CarePlan.create(info);
};

module.exports.updateCarePlan = async (id, info) => {
  return await CarePlan.findByIdAndUpdate(id, info);
};

module.exports.allCarePlan = async () => {
  return await CarePlan.find({});
};

module.exports.deleteCarePlan = async (id) => {
  return await CarePlan.findByIdAndDelete(id);
};

module.exports.findOneCarePlan = async (id) => {
  return await CarePlan.findById(id);
};
