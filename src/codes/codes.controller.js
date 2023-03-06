const {
  createCode,
  getAllCode,
  getCode,
  updateCode,
  deleteCode,
  findByCategory,
} = require("./codes.service");

module.exports.createNewCode = async (req, res) => {
  try {
    const newCode = await createCode(req.body);

    res.status(201).json({
      status: "success",
      newCode,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't create code!",
    });
  }
};

module.exports.findCodeByQuery = async (req, res) => {
  try {
    const codeList = await findByCategory(req.body);

    res.status(200).json({
      codeList,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't create code!",
    });
  }
};

module.exports.getCodeList = async (req, res) => {
  try {
    const codeList = await getAllCode();

    res.status(200).json({
      status: "success",
      codeList,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Something went wrong with code list!",
    });
  }
};

module.exports.getACode = async (req, res) => {
  try {
    const code = await getCode(req.params.id);

    res.status(200).json({
      code,
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't find code with this id!",
    });
  }
};

module.exports.codeUpdate = async (req, res) => {
  try {
    const code = await updateCode(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      code,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't update code!",
    });
  }
};

module.exports.deleteACode = async (req, res) => {
  try {
    const code = await deleteCode(req.params.id);

    res.status(200).json({
      status: "success",
      code,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Cann't delete code!",
    });
    console.log(err);
  }
};
