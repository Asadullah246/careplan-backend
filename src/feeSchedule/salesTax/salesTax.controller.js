const SalesTax = require("./salesTax.model");

module.exports.creatingSalesTax = async (req, res, next) => {
  try {
    const salesTax = await SalesTax.create(req.body);
    res.status(200).json({
      salesTax,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      message: "something went wrong creating fee schedules",
    });
  }
};

module.exports.getSalesTax = async (req, res, next) => {
  try {
    const salesTax = await SalesTax.find();
    res.status(200).json({
      salesTax,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: e.message,
      message: "something went wrong getting sales tax!",
    });
  }
};

module.exports.updateSalexTax = async (req, res, next) => {
  try {
    const salesTax = await SalesTax.findByIdAndUpdate(
      req.params.stid,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      salesTax,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: e.message,
      message: "something went wrong updating sales tax!",
    });
  }
};
