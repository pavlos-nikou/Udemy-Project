const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

const { storeReturnTo } = require('../middleware');
const { register, login, loginForm, logout, registerForm } = require('../controllers/users');


router.route("/register")
.get(registerForm)
.post(catchAsync(register));

router.route("/login")
    .get(catchAsync(loginForm))
    .post(storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), catchAsync(login));

router.get('/logout', logout);

module.exports = router;