module.exports.protectedTo = (permission) => {
  return (req, res, next) => {
    if (
      req.user.role === "administrator" ||
      req.user.permissions.includes(permission)
    ) {
      next();
    } else {
      console.log('no permisson');
      res.status(403).json({
        status: "unauthorized",
        message: "This action is not authorized!",
      });
    }
  };
};
