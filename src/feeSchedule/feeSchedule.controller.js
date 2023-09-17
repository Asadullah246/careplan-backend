const {
  allFeeSchedule,
  findFeeSchedule,
  createFeeSchedule,
  updateFeeSchedule,
  deleteFeeSchedule,
  findDefaultFS,
  setDefaultFS,
  findByCaseType,
} = require("./feeSchedule.service");

module.exports.feeSchedules = async (req, res, next) => {
  try {
    const schedules = await allFeeSchedule();
    res.status(200).json({
      schedules,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      message: "something went wrong getting fee schedules",
    });
  }
};

module.exports.getFeeSchedule = async (req, res, next) => {
  try {
    const schedule = await findFeeSchedule(req.params.fid);
    res.status(200).json({
      schedule,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      data: null,
      token: null,
      message: "something went wrong getting fee schedule",
    });
  }
};

module.exports.creatingFeeSchedule = async (req, res, next) => {
  try {
    const schedule = await createFeeSchedule(req.body);
    res.status(200).json({
      schedule: schedule.name,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      message: "something went wrong creating fee schedules",
    });
  }
};

module.exports.updateFSchedule = async (req, res, next) => {
  try {
    delete req.body.default;
    const schedule = await updateFeeSchedule(req.params.fid, req.body);
    res.status(200).json({
      schedule,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      data: null,
      token: null,
      message: "something went wrong updating fee schedules",
    });
  }
};

module.exports.deleteFSchedule = async (req, res, next) => {
  try {
    await deleteFeeSchedule(req.params.fid);
    res.status(200).json({
      data: null,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      data: null,
      token: null,
      message: "something went wrong deleting fee schedules",
    });
  }
};

module.exports.getDefaultFS = async (req, res, next) => {
  try {
    const schedule = await findDefaultFS();
    res.status(200).json({
      schedule,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      message: "something went wrong getting fee schedule",
    });
  }
};

module.exports.setDefaultFS = async (req, res, next) => {
  try {
    const existDefault = await findDefaultFS();
    if (existDefault) {
      await updateFeeSchedule(existDefault._id, { default: false });
    }
    const schedule = await setDefaultFS(req.params.fid);
    res.status(200).json({
      schedule,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      message: "something went wrong setting default fee schedule",
    });
  }
};

module.exports.findScheduleByQuery = async (req, res) => {
  try {
    const schedule = await findByCaseType(req.body);
    res.status(200).json({
      schedule,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      message: "something went wrong getting fee schedule",
    });
  }
};

