const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const { isLoggedIn, authorize, validateCampground } = require("../middleware");

router.get("/", catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}));

router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.get("/:id", catchAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate("reviews").populate("author");
    if (!campground) {
        req.flash("error", "This campground does not exist!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
}));

router.post("/new", isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    // if (!req.body.ampground) throw new ExpressError("Invalid Campground Data", 400)
    const newCamp = new Campground(req.body.campground);
    newCamp.author = req.user._id;
    await newCamp.save();
    req.flash("success", "successfully made a new campground!");
    res.redirect(`/campgrounds/${newCamp._id}`)
}));


router.get("/:id/edit", isLoggedIn, authorize, catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash("error", "This campground does not exist!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground })
}));

router.put("/:id", isLoggedIn, authorize, validateCampground, catchAsync(async (req, res, next) => {
    const id = req.params.id;
    req.flash("success", "Your Campground has been updated!")
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.delete("/:id", isLoggedIn, authorize, catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const campgoundDelete = await Campground.findByIdAndDelete(id);
    req.flash("success", "Campground was deleted successfully!");
    res.redirect(`/campgrounds`);
}));

module.exports = router;