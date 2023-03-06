const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "A code type must have a valid code"],
      unique: true,
    },
    category: {
      type: String,
      enum: ["Adjustments", "Exams", "X-rays", "Therapies", "Add Ons"],
      required: [true, "A code must be under category"],
    },
    description: {
      type: String,
      // required: [true, "Should contain some description"],
    },
    amount: {
      type: Map,
      of: Number,
    },
    discountedAmount: {
      type: Map,
      of: Number,
    },
    amount: {
      type: Map,
      of: Number,
    },
    salesTax: {
      type: Map,
      of: Boolean,
    },
    disallow: {
      type: Map,
      of: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Code = mongoose.model("code", codeSchema);
module.exports = Code;
