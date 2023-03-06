const mongoose = require("mongoose");
const careplan = require("../carePlan/carePlan.model");
const Insurance = require("../insurance/insurance.model");

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "An email address is required"],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    currentCarePlan: {
      type: mongoose.Schema.ObjectId,
      ref: "careplan",
    },
    previousCarePlans: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "careplan",
      },
    ],
    primaryInsurance: {
      type: mongoose.Schema.ObjectId,
      ref: "Insurance",
    },
    secondaryInsurance: {
      type: mongoose.Schema.ObjectId,
      ref: "Insurance",
    },
    dob: Date,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

patientSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'currentCarePlan',
    select: 'caseType'
  });
  next();
});

module.exports = mongoose.model("Patient", patientSchema);
