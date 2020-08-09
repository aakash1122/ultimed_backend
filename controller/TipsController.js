const { body } = require("express-validator");

const Tips = require("../models/Tips");
const Doctor = require("../models/Doctor");
const { handleValidation } = require("../util/utils");

// ...create new tips
const createTips = async (req, res) => {
  console.log(req.body);
  try {
    if (handleValidation(req, res)) {
      const { title, desc, imageUrl } = req.body;
      // create tips
      const resp = await Tips.create({
        title,
        desc,
        imageUrl,
        author: req.user.id,
      });
      //find author
      const author = await Doctor.findOne({ _id: req.user.id });
      // pushh new tips to author
      author.tipses.push(resp._id);
      // save change
      await author.save();
      res.status(201).json(resp);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

// update Tips
const updataTips = async (req, res) => {
  try {
    handleValidation(req, res);
    const { title, desc, _id } = req.body;
    const tips = await Tips.findOne({ _id });
    console.log(tips);
    if (!tips) res.sendStatus(404);
    // check author
    if (tips.author.toString() === req.user.id.toString()) {
      tips.title = title;
      tips.desc = desc;
      await tips.save();
      res.status(202).json(tips);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// get all tips
const getAllTipses = async (req, res) => {
  try {
    // ..find all tips and exclude password and licence field from author
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

// ...get detail of a tips
const getTipsDetail = async (req, res) => {
  try {
    // tips id
    const { id } = req.params;
    // search by id
    const tips = await Tips.findOne({ _id: id }).populate(
      "author",
      "-password -licenceNo"
    );
    //..if not found
    if (!tips) return res.sendStatus(404);
    // ..if found
    res.status(200).json(tips);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
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

// export modules
module.exports = {
  createTips,
  updataTips,
  getAllTipses,
  getTipsDetail,
  validate,
};
