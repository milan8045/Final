const User = require("../models/userSchema");

module.exports = async (req, res, next) => {
  //get user from db.
  //session
  if (!req.session.userInfo?.userId) {
    return res.redirect("/login");
  } else {
    const user = await User.findById(req.session.userInfo?.userId);
    if (user.userType === "Admin") {
      next();
    } else {
      return res.redirect("/login");
    }
  }

  //auth user
};
