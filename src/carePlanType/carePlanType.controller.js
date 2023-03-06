const {
  findAllCarePlanType,
  findCarePlanTypeByName,
  createAnewCarePlanType,
  updatePlanType,
  deletePlanType,
  findCarePlanTypeBySOC,
  findCarePlanTypeByID,
} = require("./carePlanType.service");

module.exports.getAllCarePlanType = async (req, res) => {
  try {
    const plansType = await findAllCarePlanType();
    res.status(200).json({
      total: plansType.length,
      plansType,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
      data: null,
      token: null,
      message: "something went wrong",
    });
  }
};

module.exports.getCarePlanType = async (req, res) => {
  try {
    const plan = await findCarePlanTypeByName(req.body);
    res.status(200).json({
      plan,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      token: null,
      message: "Not found",
    });
  }
};

module.exports.getCarePlanTypeByID = async (req, res) => {
  try {
    const plan = await findCarePlanTypeByID(req.params.careid);
    res.status(200).json({
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      token: null,
      message: "Not found",
    });
  }
};

module.exports.createCarePlanType = async (req, res) => {
  try {
    console.log(req.body);
    const newPlan = await createAnewCarePlanType(req.body);

    res.status(201).json({
      status: "success",
      newPlan,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err.message,
      data: null,
      token: null,
      message: "Cann't create!",
    });
  }
};

module.exports.updateCarePlanType = async (req, res) => {
  try {
    const newPlan = await updatePlanType(req.params.careid, req.body);

    res.status(201).json({
      status: "success",
      newPlan,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      token: null,
      message: "Cann't update!",
    });
  }
};

module.exports.deleteCarePlanType = async (req, res) => {
  try {
    const newPlan = await deletePlanType(req.params.careid);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      token: null,
      message: "Cann't delete!",
    });
  }
};

module.exports.getCarePlanTypeBySOC = async (req, res) => {
  try {
    const carePlanTypes = await findCarePlanTypeBySOC(req.body);
    res.status(200).json({
      status: "success",
      carePlanTypes,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      token: null,
      message: "Not found",
    });
  }
};
