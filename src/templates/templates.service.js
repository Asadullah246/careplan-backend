const Template = require("./templates.model");

module.exports.createTemplate = async (data) => {
  return await Template.create(data);
};

module.exports.getTemplate = async (type) => {
  return await Template.findOne({ type: type });
};

module.exports.getTemplateById = async (id) => {
  return await Template.findById(id);
};

module.exports.updateTemplate = async (id, data) => {
  return await Template.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });
};

module.exports.deleteTemplate = async (id) => {
  return await Template.findByIdAndDelete(id);
};

module.exports.getAllTemplate = async () => {
  return await Template.find();
};
