const {
  createTemplate,
  getTemplate,
  updateTemplate,
  deleteTemplate,
  getAllTemplate,
  getTemplateById,
} = require("./templates.service");

module.exports.createNewTemplate = async (req, res) => {
  try {
    const newTemplate = await createTemplate(req.body);

    res.status(201).json({
      newTemplate,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't create template!",
    });
    console.log(err);
  }
};

module.exports.getTempById = async (req, res) => {
  try {
    const template = await getTemplateById(req.params.id);
    res.status(200).json({
      template,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't find template!",
    });
  }
};

module.exports.getTemplateByType = async (req, res) => {
  try {
    const template = await getTemplate(req.params.type);

    res.status(200).json({
      template,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't find template!",
    });
  }
};

module.exports.updateTemp = async (req, res) => {
  try {
    const template = await updateTemplate(req.params.id, req.body);
    res.status(200).json({
      template,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't find template!",
    });
  }
};

module.exports.deleteTemp = async (req, res) => {
  try {
    const template = await deleteTemplate(req.params.id);
    res.status(200).json({
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't find template!",
    });
  }
};

module.exports.getTemplateList = async (req, res) => {
  try {
    const templates = await getAllTemplate();
    res.status(200).json({
      templates,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't find template!",
    });
  }
};
