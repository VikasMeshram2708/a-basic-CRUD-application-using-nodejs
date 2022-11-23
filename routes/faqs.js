const express = require("express");
const monk = require("monk");
const db = monk(process.env.MONGO_URI);
const faqs = db.get("faqs");
const router = express.Router();
const faqSchema = require("../models/faqsSchema");

// read all
router.get("/allFaqs", async (req, res, next) => {
  try {
    const items = await faqs.find({});
    return res.status(201).json({
      message: items,
    });
  } catch (error) {
    next(error.message);
  }
});

// read one
router.get("/faq/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await faqs.findOne({
      _id: id,
    });
    if (!item) {
      return res.status(422).json({
        message: "Not Found ❎",
      });
    }
    return res.status(201).json({
      message: item,
    });
  } catch (error) {
    next(error.message);
  }
});

// create one
router.post("/createFaq", async (req, res, next) => {
  try {
    const value = await faqSchema.validateAsync(req.body);
    value.created_date = new Date().toLocaleString();
    const createdFaq = await faqs.insert(value);
    return res.status(201).json({
      message: createdFaq,
    });
  } catch (error) {
    next(error.message);
  }
});

// update one
router.put("/updateFaq/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await faqSchema.validateAsync(req.body);
    const item = await faqs.findOne({
      _id: id,
    });
    if (!item) {
      return res.status(422).json({
        message: "Not Found ❎",
      });
    }
    const updated = await faqs.update(
      {
        _id: id,
      },
      {
        $set: value,
      }
    );
    return res.status(201).json({
      message: value,
    });
  } catch (error) {
    next(error.message);
  }
});
// delete one
router.delete("/deleteFaq/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await faqs.remove({
      _id: id,
    });
    return res.status(201).json({
      message: "Success 😈",
    });
  } catch (error) {
    next(error.message);
  }
});
module.exports = router;
