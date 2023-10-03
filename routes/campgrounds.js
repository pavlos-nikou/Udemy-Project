if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const router = express.Router();
const multer = require('multer');
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const { isLoggedIn, authorize, validateCampground } = require("../middleware");
const { index, viewCampground, newCampgroundForm, newCampground, editCampgroundForm, editCampground, deleteCampground } = require("../controllers/campgrounds");


router.get("/", catchAsync(index));

router.route("/new")
    .get(isLoggedIn, newCampgroundForm)
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(newCampground));

router.route("/:id")
    .get(catchAsync(viewCampground))
    .put(isLoggedIn, authorize, validateCampground, catchAsync(editCampground))
    .delete(isLoggedIn, authorize, catchAsync(deleteCampground));

router.get("/:id/edit", isLoggedIn, authorize, catchAsync(editCampgroundForm));

module.exports = router;