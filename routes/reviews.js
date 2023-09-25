const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/review");
const {validateReview, isLoggedIn, authorizeReview} = require('../middleware');
const { createReview, deleteReview } = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, catchAsync(createReview));

router.delete("/:reviewId", isLoggedIn, authorizeReview, catchAsync(deleteReview))

module.exports = router;