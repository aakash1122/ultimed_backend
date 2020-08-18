const express = require("express");
const router = express.Router();

const doctorController = require("../controller/DoctorController");
const { varifyToken } = require("../util/utils");
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

// ..get all doctors
router.get("/users", varifyToken, doctorController.allUsers);

// .delete user with tipses
router.post("/users/remove", varifyToken, doctorController.deleteUser);

module.exports = router;
