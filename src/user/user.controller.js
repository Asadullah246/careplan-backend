const userService = require("./user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("./user.utils");
const { findInsuranceByUserId } = require("../insurance/insurance.service");
const { gereratedToken } = require('../utils/generateToken');
const { sendVerification } = require('../utils/sendVerificationMail');
const { v4: uuidv4 } = require('uuid');

// check jwt token
// get current user
// add user id and user to request headers
module.exports.isAuthenticated = async (req, res, next) => {
  console.log("checking auth", req.headers);
  try {
    const verified = await jwt.verify(
      req.headers.token,
      process.env.JWT_SECRET
    );

    const currentUser = await userService.findUserById(verified.id);

    if (!verified && !currentUser) {
      return res.status(400).json({
        error: true,
        data: null,
        token: null,
        message: "user not authenticated or does not exist",
      });
    }
    req.headers.id = verified.id;
    req.user = currentUser;
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      data: undefined,
      token: undefined,
      message: "something went wrong",
    });
  }
};

module.exports.register = async (req, res) => {
  // console.log("register user req received..", req.body);
  try {
    const { body } = req;
    const saltRound = 10;
    const existing = await userService.findUserByEmail(req.body.email);
    if (existing)
      return res
        .status(201)
        .json({ error: true, message: "Email already exists.." });
    body.password = await hashPassword(body.password, saltRound);
    delete body.role;
    delete body.permissions;
    body.permissions = ["patient"];
    const user = await userService.createUser(body);
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;

    const token = await jwt.sign(
      {
        id: userObj._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refresh = await jwt.sign(
      {
        id: userObj._id,
      },
      process.env.REFRESH_SECRET
    );

    const refreshToken = await userService.addToken({ token: refresh });

    // send verification code
    // await verifyController.sendVerificationMail(body.email);

    return res.status(200).json({
      error: false,
      token,
      user: userObj,
      refresh: refreshToken.token,
      message: "registration completed.",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e,
      data: null,
      token: null,
      message: "something went wrong",
    });
  }
};

const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) reject(err);
      resolve(match);
    });
  });
};

module.exports.login = async (req, res) => {
  try {
    const user = await userService.findRawUser({ email: req.body.email });
    const matchPassword = await comparePassword(
      req.body.password,
      user.password
    );

    if (!matchPassword) {
      return res.status(400).json({
        error: false,
        data: null,
        token: null,
        message: "User credentials didn't matched",
      });
    }

    const userObj = JSON.parse(JSON.stringify(user));
    let primary;
    if (userObj.role === 'patient') {
      const primaryInsurance = await findInsuranceByUserId(userObj._id);
      if (primaryInsurance) primary = primaryInsurance
    }
    delete userObj.password;

    // generate access token
    const token = await jwt.sign(
      {
        id: userObj._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refresh = await jwt.sign(
      {
        id: userObj._id,
      },
      process.env.REFRESH_SECRET
    );
    const refreshToken = await userService.addToken({ token: refresh });

    return res.status(200).json({
      error: false,
      user: userObj,
      token: token,
      primary,
      refresh: refreshToken.token,
      message: "login successful",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e,
      data: null,
      token: null,
      message: "something went wrong",
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json("No token found");
    await userService.deleteToken(token);
    return res
      .status(201)
      .json({ error: false, message: "Successfully logout from this device." });
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error: true, message: "something went wrong." });
  }
};

// user response need to modify
module.exports.refreshToken = async (req, res) => {
  try {
    const token = req.headers.refresh;
    // console.log(token);
    // verify token
    const verified = await jwt.verify(token, process.env.REFRESH_SECRET);

    if (!verified) {
      return res.status(400).json({
        error: true,
        data: null,
        token: null,
        message: "user not authenticated",
      });
    }
    // extract user email
    const user = await userService.findUserById(verified.id);

    // create new access token
    const newToken = await jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // send new token to user
    let primary;
    if (user.role === 'patient') {
      const primaryInsurance = await findInsuranceByUserId(user._id);
      if (primaryInsurance) primary = primaryInsurance
    }
    return res.status(200).json({ token: newToken, user, primary });
  } catch (error) {
    console.log("error", error);
    return res.status(404).json("something went wrong.");
  }
};

module.exports.getCurrentUser = async (req, res) => {
  try {
    const user = await userService.findUserById(req.headers.id);
    console.log(user, 'user');
    return res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    return res.status(404).json("something went wrong.");
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const user = await userService.findRawUser({ email: req.user.email });
    const userId = user._id;
    const matchPassword = await comparePassword(
      req.body.currentPass,
      user.password
    );

    if (matchPassword) {
      const newPassword = await hashPassword(req.body.newPassword, 10);
      const user = await userService.updatePassword(userId, newPassword);
      res.status(200).json({
        message: "Password update successful"
      });
    } else {
      return res.status(404).json({
        data: "wrong password"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json("something went wrong.");
  }
};

module.exports.resetPasswordEmail = async (req, res) => {
  console.log('sending verification mail..');
  try {
    const existing = await userService.findUserByEmail(req.body.email);
    if(!existing){
      return res
        .status(404)
        .json({ error: true, message: "Email doesn't exist!" });
    }
    const resetToken = await uuidv4();

    console.log('generated', resetToken);
    const userReset = await userService.updateUser(existing._id, {generatedToken: resetToken});
    const response = await sendVerification(req.body.email, resetToken);
    return res.status(200).json({message: 'Reset email sent'});
  } catch (error) {
    console.log(error);
  }
}

module.exports.resetPassword = async(req, res) => {
  try {
    const token = req.params.token;
    const existingToken = await userService.findUserByToken(token);
    if(existingToken){
      // reseting password
      const newPassword = await hashPassword(req.body.password, 10);
      const user = await userService.updatePassword(existingToken._id, newPassword);
      const userReset = await userService.updateUser(existingToken._id, {generatedToken: ""});
      return res.status(200).json({message: 'Password reset successful!'});
    }
    return res.status(404).json({ error: true, message: 'Invalid token' });    
  } catch (error) {
    console.log(error);
    return res.status(404).json({error: true, message: 'Something went wrong'});
  }
};

// always remove role and permissions from req body
// remove password, __v to response
module.exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.role;
    delete updates.permissions;
    delete updates.password;
    const updatedUser = await userService.updateUser(req.user._id, updates, { runValidators: true });

    // remove password, __v to response
    res.status(200).json({
      message: 'Settings updated',
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json("something went wrong.");
  }
};