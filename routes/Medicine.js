const express = require("express");

const medicineController = require("../controller/MedicineController");
const { varifyToken } = require("../util/utils");
const router = express.Router();

// ..add new medicine
router.post(
  "/add",
  varifyToken,
  medicineController.validate("addMedicine"),
  medicineController.addMedicine
);

// update medicine
router.post(
  "/update",
  varifyToken,
  medicineController.validate("addMedicine"),
  medicineController.updateMedicine
);

// ...get all medicine
router.get("/all", medicineController.getAllMedicine);

// ...get single medicine
router.get("/:id", medicineController.getSingleMedicine);

// search medicine info
router.post(
  "/search",
  medicineController.validate("query"),
  medicineController.searchMed
);

module.exports = router;
