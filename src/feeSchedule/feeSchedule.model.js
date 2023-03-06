const mongoose = require("mongoose");

const feeScheduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A schedule must have name"],
      unique: true,
    },
    caseType: {
      type: String,
      enum: [
        "Cash",
        "Insurance",
        "Medicare",
        "Personal Injury",
        "Worker's Comp",
      ],
      required: [true, "A schedule must have case type"],
    },
    discount: {
      type: Boolean,
    },
    default: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const FeeSchedule = mongoose.model("FeeSchedule", feeScheduleSchema);

module.exports = FeeSchedule;
