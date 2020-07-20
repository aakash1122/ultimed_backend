const { body } = require("express-validator");
const { handleValidation } = require("../util/utils");
const Medicine = require("../models/Medicine");

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

const getAllMedicine = async (req, res) => {
  try {
    const allMedicines = await Medicine.find({});
    return res.status(200).json(allMedicines);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const validate = (method) => {
  switch (method) {
    case "addMedicine": {
      return [
        body("name").trim().notEmpty().withMessage("Name Required"),
        body("desc").trim().notEmpty().withMessage("Description required"),
        body("groupName").trim().notEmpty().withMessage("Group Name required"),
        body("company").trim().notEmpty().withMessage("company required"),
        body("packSize").trim().notEmpty().withMessage("Pack size required"),
        body("price").trim().notEmpty().withMessage("price required"),
      ];
    }
  }
};

module.exports = {
  addMedicine,
  getAllMedicine,
  validate,
};
