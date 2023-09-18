const Joi = require("joi");

module.exports.campgroundVSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string().required().min(0),
        description: Joi.string().required(),
        location: Joi.string().required()
    }).required()
})

module.exports.reviewVSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
})
