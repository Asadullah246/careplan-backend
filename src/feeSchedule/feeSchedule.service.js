const FeeSchedule = require("./feeSchedule.model");

module.exports.createFeeSchedule = async (info) => {
  return await FeeSchedule.create(info);
};

module.exports.updateFeeSchedule = async (id, info) => {
  return await FeeSchedule.findByIdAndUpdate(id, info, {
    new: true,
    runValidators: true,
  });
};

module.exports.allFeeSchedule = async () => {
  return await FeeSchedule.find();
};

module.exports.findByCaseType = async (query) => {
  return await FeeSchedule.find(query);
};

module.exports.deleteFeeSchedule = async (id) => {
  return await FeeSchedule.findByIdAndDelete(id);
};

module.exports.findFeeSchedule = async (id) => {
  return await FeeSchedule.findById(id);
};

module.exports.findDefaultFS = async () => {
  return await FeeSchedule.findOne({
    default: true,
  });
};

module.exports.setDefaultFS = async (id) => {
  return await FeeSchedule.findByIdAndUpdate(id, { default: true });
};
