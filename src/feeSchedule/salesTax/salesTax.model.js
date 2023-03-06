const mongoose = require("mongoose");

const salesTaxSchema = new mongoose.Schema(
  {
    salesTax: {
      type: Number,
      required: [true, "Must have a tax"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const SalesTax = mongoose.model("salestax", salesTaxSchema);

module.exports = SalesTax;
