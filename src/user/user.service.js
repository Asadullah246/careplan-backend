const User = require('./user.model');
const Refresh = require('./refresh.model');

module.exports.createUser = (userInfo) => {
  return User.create(userInfo);
};

module.exports.findUserByEmail = async(email) => {
  return (await User.findOne({ email: email }, { password: 0, createdAt: 0, updatedAt: 0 }));
};
module.exports.findRawUser = async (query) => {
  return (await User.findOne({ ...query }));
};
module.exports.findUserById = async (id) => {
  return (await User.findById(id, { password: 0, createdAt: 0, updatedAt: 0 }));
};
module.exports.verifyUserEmail = (email) => {
  return User.findOneAndUpdate({ email: email }, {isVerified: true}, {new: true});
};

module.exports.addToken = (token) => {
  return Refresh.create(token);
};

module.exports.findToken = (token) => {
  return Refresh.findOne({token});
};

module.exports.deleteToken = (token) => {
  return Refresh.findOneAndDelete({token});
};

// team members
module.exports.getTeamMembers = async () => {
  return await User.find({ role: "management" }, { password: 0, createdAt: 0, updatedAt: 0 });
};

// findByIdAndUpdate
// remove role, password field
module.exports.updateTeamMember = async (id, updates) => {
  return await User.findByIdAndUpdate(id, { ...updates });
};

module.exports.deleteMember = async (id) => {
  return await User.findByIdAndDelete(id);
};

// patient section
module.exports.findAllPatient = async () => {
  return await User.find({role: "patient"});
};

module.exports.findPatient = async (pid) => {
  return await User.findOne({_id: pid});
}

// replace patient model with user?
module.exports.updatePrimaryInsurance = async (pid, insuranceInfo) => {
  return await Patient.findByIdAndUpdate(pid, {primaryInsurence: insuranceInfo}, {new: true});
}

// replace patient model with user?
module.exports.updateSecondaryInsurance = async (pid, insuranceInfo) => {
  return await Patient.findByIdAndUpdate(pid, {secondaryInsurence: insuranceInfo}, {new: true});
}

// replace patient model with user?
module.exports.updatePassword = async (pid, password) => {
  return await User.findByIdAndUpdate(pid, { password }, { new: true });
}

// replace patient model with user?
module.exports.updateUser = async (id, updates) => {
  console.log('updating user...', updates);
  return await User.findByIdAndUpdate(id, { ...updates }, { new: true });
}

// searching user with correct token
module.exports.findUserByToken = async(token) => {
  return (await User.findOne({ generatedToken: token }, { password: 0, createdAt: 0, updatedAt: 0 }));
};