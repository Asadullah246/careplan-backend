const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema(
  {
    // company: {
    //   type: String,
    //   required: [true, "Company name is required"],
    //   trim: true,
    // },
    // effective_date: {
    //   type: Date,
    //   required: [true, "Effective date is required"],
    // },
    // expiration_date: {
    //   type: Date,
    //   required: [true, "Expiration date is required"],
    // },
    // // individual_deductable: {
    // //   type: Number,
    // //   required: [true, "individual deductable is required"],
    // // },
    // individual_deductable_Met: {
    //   type: Number,
    //   required: [true, "individual deductable met is required"],
    // },
    // family_deductable: {
    //   type: Number,
    //   // required: [true, "family deductable is required"],
    // },
    // family_deductable_Met: {
    //   type: Number,
    //   // required: [true, "family deductable met is required"],
    // },
    // start_meeting_deductable: {
    //   type: String,
    //   default: "n/a",
    // },
    // benefitsBase: {
    //   type: { type: String, required: [true, "Benefits based on required."] },
    //   date: { type: Date },
    // },
    // visits_allowed: Number,
    // visits_used: Number,
    // allowed_percentage: Number,
    // amount_max_per_visit: Number,
    // visit_co_pay: Number,
    // exam_co_pay: Number,
    // // co_insurance: Number,
    // co_insurance:  {
    //   type: String,
    //   default: "n/a",
    // },
    // x_ray_coverage: {
    //   type: String,
    //   default: "n/a",
    // },
    // x_ray_percent_coverage: Number,
    // x_rays_subject_to_deductable: {
    //   type: String,
    //   default: "no",
    // },

    // new update 

    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    individual_deductable: {
      type: Number,
      required: [true, "individual deductable is required"],
    },
    remaining_deductable: {
      type: Number,
      required: [true, "remaining deductable is required"],
    },
    office_visit_992XX:{
      type:String,
      required: [true, "office visit is required"],
    },
    office_visit_co_insurance:Number,
    office_visit_co_pay:Number,

    chiro_benefit_989XX:{
      type:String,
    },
    chiro_benefit_co_insurance:Number,
    chiro_benefit_co_pay:Number,
    chiro_benefit_remaining:Number,

    physical_therapy_97XXX:{
      type:String,
    },
    physical_therapy_co_insurance:Number,
    physical_therapy_co_pay:Number,
    physical_therapy_remaining:Number,

    diagnostic_72XXX:{
      type:String,
    },
    diagnostic_co_insurance:Number,
    diagnostic_co_pay:Number,
    diagnostic_remaining:Number,

  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Insurance", insuranceSchema);


