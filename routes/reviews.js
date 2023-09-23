const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/review");
const {validateReview, isLoggedIn, authorizeReview} = require('../middleware');
const { authorize } = require("passport");

router.post("/", isLoggedIn, validateReview, async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    console.log(req.params);
    req.flash("success","Your review was submitted successfully!");
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

router.delete("/:reviewId", isLoggedIn, authorizeReview, catchAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    const campgound = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const review = await Review.findByIdAndDelete(reviewId);
    req.flash("success","Your review was deleted successfully");
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;