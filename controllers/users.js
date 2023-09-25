const User = require('../models/user');


module.exports.registerForm = (req, res) => {
    res.render("users/register");
}

module.exports.register = async (req, res) => {
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
}

module.exports.loginForm = async (req, res) => {
    res.render("users/login")
}

module.exports.login = async (req, res) => {
    req.flash("success", "welcome back!");
    console.log(res.locals.returnTo);
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // 
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}