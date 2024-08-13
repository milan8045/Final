const userSchema = require("./../models/userSchema");

module.exports = async (req, res) => {
  const { username, password, confirmPassword, userType } = req.body;
  try {
    const user = await userSchema.findOne({ username: username });
    if (user) {
      res.render("signup", {
        pageTitle: "Sign up",
        errorMsg: "User already exists, Please Login",
      });
    } else if (password != confirmPassword) {
      res.render("signup", {
        pageTitle: "Sign up",
        errorMsg: "Passwords do not match",
      });
    } else if (username && password && confirmPassword && userType) {
      const newUser = {
        username: username,
        password: password,
        userType: userType,
      };
      const createUser = new userSchema(newUser);
      await createUser.save();
      res.redirect("/login");
    } else {
      res.render("signup", {
        pageTitle: "Sign up",
        errorMsg: "Please enter all the details",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
