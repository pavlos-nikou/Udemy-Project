const Campground = require('../models/campground');


module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}

module.exports.viewCampground = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!campground) {
        req.flash("error", "This campground does not exist!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
}

module.exports.newCampgroundForm = (req, res) => {
    res.render("campgrounds/new");
}

module.exports.newCampground = async (req, res, next) => {
    // if (!req.body.ampground) throw new ExpressError("Invalid Campground Data", 400)
    const newCamp = new Campground(req.body.campground);
    newCamp.author = req.user._id;
    await newCamp.save();
    req.flash("success", "successfully made a new campground!");
    res.redirect(`/campgrounds/${newCamp._id}`)
}

module.exports.editCampgroundForm = async (req, res, next) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash("error", "This campground does not exist!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground })
}

module.exports.editCampground = async (req, res, next) => {
    const id = req.params.id;
    req.flash("success", "Your Campground has been updated!")
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res, next) => {
    const id = req.params.id;
    const campgoundDelete = await Campground.findByIdAndDelete(id);
    req.flash("success", "Campground was deleted successfully!");
    res.redirect(`/campgrounds`);
}