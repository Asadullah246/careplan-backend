const mongoose = require("mongoose");

const templatesSchema = new mongoose.Schema(
  {
    data: Object,
    type: String,
    name: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Template = mongoose.model("template", templatesSchema)

module.exports = Template;
