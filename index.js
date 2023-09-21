const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
// const catchAsync = require("./utils/catchAsync");

const mongoose = require("mongoose");

// // models and schemas
// const { campgroundVSchema } = require("./utils/joiSchemas");
// const { reviewVSchema } = require("./utils/joiSchemas");

// const Campground = require("./models/campground");
// const Review = require("./models/review");
const User = require("./models/user");

// middleware


// router
const campgroundsRoutes = require("./routes/campgrounds");
const reviewsRoutes = require("./routes/reviews");
const registerRoutes = require('./routes/users');

// for authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userRoutes = require("./models/user");

// connect to database
mongoose.connect("mongodb+srv://under:construction@ucdatabase.f09kl.mongodb.net/Yelpcamp")
    .then(() => {
        console.log("connected yo db");
    })
    .catch(error => {
        console.log(error);
    })

app.engine("ejs", ejsmate);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

const sessiosConfig = {
    secret: "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        http0nly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessiosConfig));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use("/",registerRoutes)
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/review", reviewsRoutes);

app.get("/", (req, res) => {
    res.render("home");
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
});

app.use((err, req, res, next) => {
    const { statusCode = "500", message = "Something Went Wrong" } = err;
    if (!err.message) error.message = message
    res.status(statusCode).render("error", { err })
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});