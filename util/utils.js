require("dotenv").config();
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const hashPassword = (plainPassword) => {
  const salt = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(plainPassword, salt);
  return hash;
};

const checkPassword = (plainPassword, hash) => {
  const matched = bcrypt.compareSync(plainPassword, hash); // true
  return matched ? true : false;
};

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    return res.status(400).json(errors);
  }
};

const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    return token;
  }
  return;
};

const varifyToken = (req, res, next) => {
  const token = extractToken(req);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  checkPassword,
  handleValidation,
  varifyToken,
};
