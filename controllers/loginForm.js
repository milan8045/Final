const User = require("./../models/userSchema");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  // Get info from UI
  const uName = req.body.username;
  const pass = req.body.password;
  // Comp with DB
  // fectch user from DB.
  try {
    const user = await User.findOne({ username: uName });

    if (user) {
      bcrypt.compare(pass, user.password, (error, isSame) => {
        if (isSame) {
          //Session
          req.session.userInfo = {
            userId: user._id,
            userType: user.userType,
          };
          //login
          console.log("User login!!! ");
          res.redirect("/");
        } else {
          console.log("password not match!!!");
          res.render("login", {
            pageTitle: "Login",
            errorMsg: "Password do not match",
          });
        }
      });
    } else {
      console.log("Not a user!!!");
      res.render("login", {
        pageTitle: "Login",
        errorMsg: "Not a valid user",
      });
    }
  } catch (error) {
    console.log("Error :: While login func!");
    res.redirect("/login");
  }

  //Login
};
