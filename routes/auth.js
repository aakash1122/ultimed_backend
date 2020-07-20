const express = require("express");
const router = express.Router();

const doctorController = require("../controller/DoctorController");

// ...register doctor
router.post(
  "/signup",
  doctorController.validate("createDoctor"),
  doctorController.createDoctor
);

// ...login doctor
router.post(
  "/login",
  doctorController.validate("checkDoctor"),
  doctorController.loginDoctor
);

// ...doctor profile
router.get("/user/:id", doctorController.profile);

module.exports = router;
