const mongoose = require("mongoose");
const FeeSchedule = require("../feeSchedule/feeSchedule.model");
const careplantype = require("../carePlanType/carePlanType.model");

const carePlanSchema = new mongoose.Schema(
  {
    carePlan: {
      AddOns: {
        type: Map,
        of: {
          code: Number,
          id: {
            type: mongoose.Schema.ObjectId,
            ref: "Code",
          },
          visits: [Number],
          _id: String,
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
          _id: String,
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
          _id: String,
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
          _id: String,
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
          _id: String,
        },
      },
      frequency: {
        fiveperweek: Number,
        fourperweek: Number,
        threeperweek: Number,
        twoperweek: Number,
        oneperweek: Number,
        everyperweek: Number,
      },
      months: Number,
      visits: Number,
    },
    carePlanType: {
      type: mongoose.Schema.ObjectId,
      ref: "careplantype",
    },
    caseType: String,
    cost: {
      userCost: Number,
      totalCost: Number,
      insuranceCoverage: Number,
      insuranceSavings: Number,
      monthlyCost: Number,
      defaultFeeScheduleCost: Number,
      discountedAmount:Number,
    },
    feeSchedule: {
      type: mongoose.Schema.ObjectId,
      ref: "FeeSchedule",
    },

    phaseOfDegenration: String,
    insuranceVisits:Number,
    stageOfCare: String,
    planName: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

carePlanSchema.pre(/^find/, function (next) {
  this.populate({
    path: "feeSchedule",
    select: "name",
  });
  this.populate({
    path: "carePlanType",
    select: "planName",
  });
  next();
});

const CarePlan = mongoose.model("careplan", carePlanSchema);
module.exports = CarePlan;
