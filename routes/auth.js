const express = require("express");
const router = express.Router();

const doctorController = require("../controller/DoctorController");

// ...create doctor
router.post(
  "/signup",
  doctorController.validate("createDoctor"),
  doctorController.createDoctor
);

// ...login user
router.post(
  "/login",
  doctorController.validate("checkDoctor"),
  doctorController.loginDoctor
);

module.exports = router;
