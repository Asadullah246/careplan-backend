const {
  allCarePlan,
  createNewCarePlan,
  findOneCarePlan,
  deleteCarePlan,
  updateCarePlan,
} = require("./carePlan.service");

module.exports.getAllCarePlans = async (req, res) => {
  try {
    const plans = await allCarePlan();
    res.status(200).json({
      data: {
        plans,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Something went wrong!",
    });
  }
};

module.exports.createCarePlan = async (req, res) => {
  try {
    console.log("starting working", req.body)
    const newPlan = await createNewCarePlan(req.body);
    console.log("res ", res);
    res.status(201).json({
      status: "success",
      newPlan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Something went wrong!",
    });
  }
};

module.exports.getCarePlan = async (req, res) => {
  try {
    const plan = await findOneCarePlan(req.params.careid);
    res.status(200).json({
      plan
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      data: null,
      message: "Not found",
    });
  }
};

module.exports.deleteCarePlan = async (req, res) => {
  try {
    const newPlan = await deleteCarePlan(req.params.careid);

    res.status(200).json({
      status: "success",
      newPlan,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      message: "Cann't delete!",
    });
  }
};

module.exports.updateCarePlan = async (req, res) => {
    try {
      const newPlan = await updateCarePlan(req.params.careid, req.body);

      res.status(201).json({
        status: "success",
        newPlan
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
