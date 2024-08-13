const User = require("./../models/userSchema");

module.exports = async (req, res) => {
  const userData = await User.find({
    result: {
      $exists: true,
    },
  });
  res.render("appointments", {
    pageTitle: "Appointments",
    allApps: userData,
    singleUser: null,
  });
};
