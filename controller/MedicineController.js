const { body } = require("express-validator");
const { handleValidation } = require("../util/utils");
const Medicine = require("../models/Medicine");

// ...create new medicine
const addMedicine = async (req, res) => {
  try {
    handleValidation(req, res);
    // ...check if admin
    if (req.user.isAdmin) {
      const { name, desc, groupName, company, packSize, price } = req.body;
      const resp = await Medicine.create({
        name,
        desc,
        groupName,
        company,
        packSize,
        price,
      });
      return res.status(201).json(resp);
    } else {
      // not admin
      return res.sendStatus(401);
    }
  } catch (error) {
    return res
      .status(400)
      .send(
        error.code === 11000
          ? "This Medicine already exists"
          : "Something Went Wrong"
      );
  }
};

// ...update medicine
const updateMedicine = async (req, res) => {
  handleValidation(req, res);
  try {
    const { name, desc, groupName, company, packSize, price, _id } = req.body;
    const resp = await Medicine.updateOne(
      { _id: _id },
      {
        name,
        desc,
        groupName,
        company,
        packSize,
        price,
      }
    );
    console.log(resp);
    if (!resp) res.sendStatus(404);
    return res.status(201).json(resp);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

// ...get all medicine
const getAllMedicine = async (req, res) => {
  try {
    const allMedicines = await Medicine.find({});
    return res.status(200).json(allMedicines);
  } catch (error) {
    return res.sendStatus(500);
  }
};

// ...search medicine
const searchByName = async (req, res) => {
  handleValidation(req, res);
  try {
    const { name } = req.body;
    const medicine = await Medicine.findOne({ name });
    if (medicine) return res.status(200).json(medicine);
    return res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// ...validator and sanitizer
const validate = (method) => {
  switch (method) {
    case "addMedicine": {
      return [
        body("name").trim().notEmpty().withMessage("Name Required").escape(),
        body("desc")
          .trim()
          .notEmpty()
          .withMessage("Description required")
          .escape(),
        body("groupName")
          .trim()
          .notEmpty()
          .withMessage("Group Name required")
          .escape(),
        body("company")
          .trim()
          .notEmpty()
          .withMessage("company required")
          .escape(),
        body("packSize")
          .trim()
          .notEmpty()
          .withMessage("Pack size required")
          .escape(),
        body("price").trim().notEmpty().withMessage("price required").escape(),
      ];
    }
    case "search": {
      return [body("name").trim().notEmpty().escape()];
    }
  }
};

module.exports = {
  addMedicine,
  updateMedicine,
  getAllMedicine,
  validate,
  searchByName,
};
