const mongoose = require("mongoose");
const Code = require("../codes/codes.model");
const feeSchedule = require("../feeSchedule/feeSchedule.model");
const Template = require("../templates/templates.model");

const carePlanTypeSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: [true, "Care plan name is requried"],
      trim: true,
      unique: true,
    },
    stageOfCare: {
      type: String,
      enum: [
        "Initial Intensive Care",
        "Corrective Care",
        "Wellness Care",
        "Maintenance Care",
      ],
      default: "Initial Intensive Care",
    },
    visits: {
      type: Number,
      required: [true, "Total visits is requried"],
    },
    months: {
      type: Number,
      required: [true, "Total months is requried"],
    },
    frequency: {
      fiveperweek: Number,
      fourperweek: Number,
      threeperweek: Number,
      twoperweek: Number,
      oneperweek: Number,
      everyperweek: Number,
    },
    template: {
      type: mongoose.Schema.ObjectId,
      ref: "Template",
    },
    AddOns: {
      type: Map,
      of: {
        code: Number,
        id: {
          type: mongoose.Schema.ObjectId,
          ref: "Code",
        },
        visits: [Number],
      },
    },
    Adjustments: {
      type: Map,
      of: {
        code: Number,
        id: {
          type: mongoose.Schema.ObjectId,
          ref: "Code",
        },
        visits: [Number],
      },
    },
    Exams: {
      type: Map,
      of: {
        code: Number,
        id: {
          type: mongoose.Schema.ObjectId,
          ref: "Code",
        },
        visits: [Number],
      },
    },
    Therapies: {
      type: Map,
      of: {
        code: Number,
        id: {
          type: mongoose.Schema.ObjectId,
          ref: "Code",
        },
        visits: [Number],
      },
    },
    XRays: {
      type: Map,
      of: {
        code: Number,
        id: {
          type: mongoose.Schema.ObjectId,
          ref: "Code",
        },
        visits: [Number],
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CarePlanType = mongoose.model("careplantype", carePlanTypeSchema);

module.exports = CarePlanType;
