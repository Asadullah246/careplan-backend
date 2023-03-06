const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: `${__dirname}/../.env` });

require('./carePlan/carePlan.model');
require('./patient/patient.model');

const usersRouter = require("./routes/users");
const teamMemberRouter = require("./routes/teamMember");
const patientRouter = require("./routes/patients");
const carePlanRouter = require("./routes/carePlan");
const feeScheduleRouter = require("./routes/feeschedule");
const template = require("./routes/template");
const code = require("./routes/code");

require("./db/db");

const app = express();

console.log("running server on 3005");
app.use(logger("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/browser', (req, res) => {
//   console.log(typeof req.headers["user-agent"]);
//   console.log(req.header('x-forwarded-for'), 'header')
//   console.log(req.connection.remoteAddress, 'ip')
//   res.json(req.headers)
// })
console.log("app started");
app.use("/users", usersRouter);
app.use("/team-member", teamMemberRouter);
app.use("/patients", patientRouter);
app.use("/careplan", carePlanRouter);
app.use("/fee-schedule", feeScheduleRouter);
app.use("/template", template);
app.use("/code", code);

app.all("*", (req, res, next) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
