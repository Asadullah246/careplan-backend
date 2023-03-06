const Code = require("./codes.model");

module.exports.createCode = async (info) => {
  return await Code.create(info);
};

module.exports.getAllCode = async () => {
  return await Code.find();
};

module.exports.findByCategory = async (query) => {
  return await Code.find(query);
};

module.exports.getCode = async (id) => {
  return await Code.findById(id);
};

module.exports.updateCode = async (id, info) => {
  return await Code.findByIdAndUpdate(id, info, {
    runValidators: true,
    new: true,
  });
};

module.exports.deleteCode = async (id) => {
  return await Code.findByIdAndDelete(id);
};
