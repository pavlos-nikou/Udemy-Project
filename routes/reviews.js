const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/review");
const { reviewVSchema } = require("../utils/joiSchemas");

const validateReview = (req, res, next) => {
    const { error } = reviewVSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

router.post("/", validateReview, async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    console.log(req.params);
    req.flash("success","Your review was submitted successfully!");
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

router.delete("/:reviewId", catchAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    const campgound = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const review = await Review.findByIdAndDelete(reviewId);
    req.flash("success","Your review was deleted successfully");
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;