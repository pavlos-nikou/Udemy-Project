const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const { isLoggedIn, authorize, validateCampground } = require("../middleware");
const { index, viewCampground, newCampgroundForm, newCampground, editCampgroundForm, editCampground, deleteCampground } = require("../controllers/campgrounds");

router.get("/", catchAsync(index));

router.get("/new", isLoggedIn, newCampgroundForm);

router.get("/:id", catchAsync(viewCampground));

router.post("/new", isLoggedIn, validateCampground, catchAsync(newCampground));

router.get("/:id/edit", isLoggedIn, authorize, catchAsync(editCampgroundForm));

router.put("/:id", isLoggedIn, authorize, validateCampground, catchAsync(editCampground));

router.delete("/:id", isLoggedIn, authorize, catchAsync(deleteCampground));

module.exports = router;