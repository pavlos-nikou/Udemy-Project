const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');


router.get("/register", (req, res) => {
    res.render("users/register");
})

router.post("/register", catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const newUserRegistered = await User.register(newUser, password);
        req.login(newUserRegistered, err => {
            if (err) return next(err)
            req.flash("success", "Welcome to Yelpcamp!");
            res.redirect("/campgrounds");
        });


    } catch (error) {
        req.flash("error", error.message)
        res.redirect("register");
    }
}));

router.get("/login", catchAsync(async (req, res) => {
    res.render("users/login")
}));

router.post("/login", storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), catchAsync(async (req, res) => {
    req.flash("success", "welcome back!");
    console.log(res.locals.returnTo);
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // 
    res.redirect(redirectUrl);
}));

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
});

module.exports = router;