const User = require("../models/userSchema");

module.exports = async (req, res) => {
  const userData = await User.find({
    appointmentId: {
      $exists: true,
    },
  });
  let singleUserData = null;
  if (req.query.userId) {
    singleUserData = await User.findById(req.query.userId);
  }

  res.render("examiner", {
    pageTitle: "Examiner",
    allApps: userData,
    singleUser: singleUserData,
  });
};
