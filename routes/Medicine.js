const express = require("express");

const medicineController = require("../controller/MedicineController");
const { varifyToken } = require("../util/utils");
const router = express.Router();

// ..add new medicine
router.post(
  "/add",
  medicineController.validate("addMedicine"),
  varifyToken,
  medicineController.addMedicine
);

// ...get all medicine
router.get("/all", medicineController.getAllMedicine);

module.exports = router;
