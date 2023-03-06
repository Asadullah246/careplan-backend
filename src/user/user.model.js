const mongoose = require("mongoose");
const CarePlan = require("../carePlan/carePlan.model");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema(
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
      type: String
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    currentCarePlan: {
      type: mongoose.Schema.ObjectId,
      ref: "CarePlan"
    },
    previousCarePlans: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CarePlan",
      },
    ],
    // primaryInsurance: {
    //   type: {
    //     company: {
    //       type: String,
    //       required: [true, "Company name is required"],
    //       trim: true
    //     },
    //     effective_date: {
    //       type: Date,
    //       required: [true, "Effective date is required"]
    //     },
    //     expiration_date: {
    //       type: Date,
    //       required: [true, "Expiration date is required"]
    //     },
    //     individual_deductable: {
    //       type: Number,
    //       required: [true, "individual deductable is required"]
    //     },
    //     individual_deductable_Met: {
    //       type: Number,
    //       required: [true, "individual deductable met is required"]
    //     },
    //     family_deductable: {
    //       type: Number,
    //       required: [true, "family deductable is required"]
    //     },
    //     family_deductable_Met: {
    //       type: Number,
    //       required: [true, "family deductable met is required"]
    //     },
    //     start_meeting_deductable: {
    //       type: String,
    //       default: 'n/a',
    //     },
    //     benefitsBase: {
    //       type: { type: String, required: [true, 'Benefits based on required.'] },
    //       date: { type: Date }
    //     },
    //     visits_allowed: Number,
    //     visits_used: Number,
    //     allowed_percentage: Number,
    //     amount_max_per_visit: { type: Number, default: undefined },
    //     visit_co_pay: Number,
    //     exam_co_pay: Number,
    //     co_insurance: Number,
    //     x_ray_coverage: {
    //       type: String,
    //       default: 'n/a',
    //     },
    //     x_ray_percent_coverage: Number,
    //     x_rays_subject_to_deductable: {
    //       type: String,
    //       default: 'no'
    //     },
    //   },
    // },
    // secondaryInsurance: {
    //   type: {
    //     company: {
    //       type: String,
    //       required: [true, "Company name is required"],
    //       trim: true
    //     },
    //     effective_date: {
    //       type: Date,
    //       required: [true, "Effective date is required"]
    //     },
    //     expiration_date: {
    //       type: Date,
    //       required: [true, "Expiration date is required"]
    //     },
    //     individual_deductable: {
    //       type: Number,
    //       required: [true, "individual deductable is required"]
    //     },
    //     individual_deductable_Met: {
    //       type: Number,
    //       required: [true, "individual deductable met is required"]
    //     },
    //     family_deductable: {
    //       type: Number,
    //       required: [true, "family deductable is required"]
    //     },
    //     family_deductable_Met: {
    //       type: Number,
    //       required: [true, "family deductable met is required"]
    //     },
    //     start_meeting_deductable: {
    //       type: String,
    //       default: 'n/a',
    //     },
    //     benefitsBase: {
    //       type: { type: String, required: [true, 'Benefits based on required.'] },
    //       date: { type: Date }
    //     },
    //     visits_allowed: Number,
    //     visits_used: Number,
    //     allowed_percentage: Number,
    //     amount_max_per_visit: { type: Number, default: undefined },
    //     visit_co_pay: Number,
    //     exam_co_pay: Number,
    //     co_insurance: Number,
    //     x_ray_coverage: {
    //       type: String,
    //       default: 'n/a',
    //     },
    //     x_ray_percent_coverage: Number,
    //     x_rays_subject_to_deductable: {
    //       type: String,
    //       default: 'no'
    //     },
    //   },
    // },
    dob: Date,
    permissions: [
      {
        type: String,
        enum: ["insurance-tab", "build-care-plan", "fee-schedules", "patient", "team-member"]
      }
    ],
    role:
      {
        type: String,
        enum: [
          "management",
          "administrator",
          "patient"
        ],
        default: "patient"
      },
    generatedToken: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
