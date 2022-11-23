const Joi = require("joi");

const faqSchema = Joi.object({
  question: Joi.string().trim().min(2).max(100).required(),
  answer: Joi.string().trim().min(2).max(250).required(),
  video_uri: Joi.string().uri(),
});

module.exports = faqSchema;
