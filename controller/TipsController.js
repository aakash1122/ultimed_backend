const { body } = require("express-validator");

const Tips = require("../models/Tips");
const { handleValidation } = require("../util/utils");

// ...create new tips
const createTips = async (req, res) => {
  try {
    handleValidation(req, res);
    const { title, desc } = req.body;
    const resp = await Tips.create({
      title,
      desc,
      author: req.user.id,
    });
    res.status(201).json(resp);
  } catch (error) {
    return res.sendStatus(500);
  }
};

// get all tipe
const getAllTipses = async (req, res) => {
  try {
    const tipses = await Tips.find({}).populate(
      "author",
      "-password -licenceNo"
    );
    return res.status(200).json(tipses);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// ...validator
const validate = (method) => {
  switch (method) {
    case "createTips": {
      return [
        body("title")
          .trim()
          .notEmpty()
          .withMessage("title required")
          .isLength({ min: 10 })
          .withMessage("title needs to be at least 10 characters long"),
        body("desc")
          .trim()
          .notEmpty()
          .withMessage("description required")
          .isLength({ min: 100 })
          .withMessage("description needs to be at least 100 characters long"),
      ];
    }
  }
};

module.exports = {
  createTips,
  getAllTipses,
  validate,
};
