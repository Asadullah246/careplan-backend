const { filterData } = require("../utils/resData");
const userService = require("./user.service");
const { hashPassword } = require("./user.utils");

// verify user is admin
// get team member data from req
// salt password
// add team member to db
module.exports.addTeamMember = async (req, res) => {
  const { firstName, lastName, email, permissions, phone } = req.body;
  try {
    const existing = await userService.findUserByEmail(email);
    if (existing)
      return res
        .status(201)
        .json({ error: true, message: "Team member with that email already exists.." });
    const password = await hashPassword(req.body.password);

    const teamMember = await userService.createUser({ firstName, lastName, email, phone, permissions, role: 'management', password });
    delete teamMember.password
    res.status(200).json({
      message: 'Team member added.',
      member: teamMember,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json("something went wrong.");
  }
};

module.exports.deleteTeamMember = async (req, res) => {
  try {
    const user = await userService.deleteMember(req.params.tid);
    res.status(200).json({
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json("something went wrong.");
  }
};

module.exports.getTeamMembers = async (req, res) => {
  try {
    const members = await userService.getTeamMembers();
    res.status(200).json({
      total: members.length,
      members,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json("something went wrong for getting member list");
  }
};

// remove role, password, email field from body
// remove password, __v to response
module.exports.updateTeamMember = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.role;
    delete updates.password;
    delete updates.email;
    const updatedMember = await userService.updateTeamMember(req.params.tid, { ...updates }, { runValidators: true });
    console.log(updatedMember);
    const updated = JSON.parse(JSON.stringify(updatedMember))
    // remove password, __v to response
    delete updated.password;
    delete updated.__v;
    delete updated.createdAt;
    delete updated.updatedAt;
    res.status(200).json({
      message: 'Team members updated',
      member: updated,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json("something went wrong.");
  }
};
