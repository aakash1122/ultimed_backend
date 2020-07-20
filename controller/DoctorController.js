const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const {
  handleValidation,
  hashPassword,
  checkPassword,
} = require("../util/utils");
const Doctor = require("../models/Doctor");

// ...register new doctor
const createDoctor = async (req, res) => {
  handleValidation(req, res);
  try {
    const {
      name,
      email,
      password,
      phone,
      chamberLocation,
      licenceNo,
      degree,
    } = req.body;
    const hashedPassword = hashPassword(password);
    const resp = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      chamberLocation,
      licenceNo,
      degree,
    });
    return res.status(201).json(resp);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send(error.code === 11000 ? "Duplicate User" : "Something Went Wrong");
  }
};

// ...login doctor
const loginDoctor = async (req, res) => {
  handleValidation(req, res);
  const { email, password } = req.body;
  try {
    const user = await Doctor.findOne({ email });
    if (user) {
      const passMatched = checkPassword(password, user.password);
      if (passMatched) {
        const userdata = {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        // send user jwt
        const token = jwt.sign(userdata, process.env.JWT_SECRET);
        return res.json({ token: token, data: userdata });
      } else {
        return res.send("wrong credentials");
      }
    }
    res.send("user not found");
  } catch (error) {
    console.log(error);
  }
};

// ...validate data
const validate = (method) => {
  switch (method) {
    case "createDoctor": {
      return [
        body("name")
          .trim()
          .exists()
          .withMessage("username required")
          .isLength({ min: 5 })
          .withMessage("username must be at least 5 characters long"),
        body("email")
          .trim()
          .notEmpty()
          .withMessage("Email required")
          .isEmail()
          .normalizeEmail()
          .withMessage("Incorrect email format"),
        body("password")
          .trim()
          .exists()
          .withMessage("password required")
          .isLength({ min: 6 })
          .withMessage("password must be at least 6 characters long"),
        body("licenceNo")
          .trim()
          .notEmpty()
          .withMessage("licenceNo can not be empty"),
        body("degree")
          .trim()
          .notEmpty()
          .withMessage("degree can not be empty."),
        body("phone")
          .trim()
          .isMobilePhone()
          .withMessage("invalid mobile number"),
      ];
    }

    case "checkDoctor": {
      return [
        body("email").trim().notEmpty().withMessage("Email required"),
        body("password").trim().notEmpty().withMessage("password required"),
      ];
    }
  }
};

module.exports = { validate, createDoctor, loginDoctor };