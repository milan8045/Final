//Modules
const express = require("express");
const app = express();
const expressSession = require("express-session");
const mongoose = require("mongoose");

//Controllers

const g2RouteController = require("./controllers/g2Route");
const gRouteController = require("./controllers/gRoute");

const loginFormController = require("./controllers/loginForm");
const gFormController = require("./controllers/gForm");
const g2FormController = require("./controllers/g2");
const signupFormController = require("./controllers/signupForm");
const logoutController = require("./controllers/logout");
const appointmentController = require("./controllers/appointmentRoute");
const appointmentFormController = require("./controllers/appointment");
const examinerController = require("./controllers/examiner");
const commentController = require("./controllers/comment");
const appointmentsController = require("./controllers/appointments");
//Guards
const auth = require("./middleware/auth");
const isAuthRedirect = require("./middleware/isAuthRedirect");
const adminGuard = require("./middleware/admin");
const examinerGuard = require("./middleware/examinerAuth");

// connecting to my db
const connectionString =
  "mongodb+srv://milanpatel8045:Milan%402299@cluster0.rn6w1x3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0db.net/";
try {
  mongoose.connect(connectionString);
  console.log("MongoDb Connected!!");
} catch (err) {
  console.error("MongoDb Erroorrr!!" + err);
}

//Global Variable
global.loggedIn = null;
// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "verysecret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userInfo;
  next();
});

//Dashboard route
app.get("/", (req, res) => {
  res.render("dashboard", { pageTitle: "Dashboard" });
});
//G2 Portal route
app.get("/g2", auth, g2RouteController);
//G Portal route
app.get("/g", auth, gRouteController);
//Login route
app.get("/login", isAuthRedirect, (req, res) => {
  res.render("login", { pageTitle: "Login", errorMsg: "" });
});
//Signup Portal route
app.get("/signup", isAuthRedirect, (req, res) => {
  res.render("signup", { pageTitle: "Sign up", errorMsg: "" });
});
//Appoinment Route
app.get("/appointment", adminGuard, appointmentController);
//Examiner Route
app.get("/examiner", examinerGuard, examinerController);
//Get Single User Data
app.get("/getSingleUser", examinerController);
//Get all appointments
app.get("/appointments", appointmentsController);

//Signup user
app.post("/userSignup", signupFormController);
//Login user
app.post("/userLogin", loginFormController);
//Update G
app.post("/gUpdate", auth, gFormController);
//Save G2 Details
app.post("/g2Save", auth, g2FormController);
//Create Appointment
app.post("/appointment", appointmentFormController);

app.post("/addComment", commentController);
//Logout User
app.get("/logout", logoutController);

app.listen(4000, () => {
  console.log(`App link: http://localhost:4000`);
});
