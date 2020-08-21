const { body } = require("express-validator");
const mongoose = require("mongoose");
const { handleValidation } = require("../util/utils");
const Medicine = require("../models/Medicine");

// ...create new medicine
const addMedicine = async (req, res) => {
  try {
    if (handleValidation(req, res)) {
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
  if (handleValidation(req, res)) {
    try {
      const { name, desc, groupName, company, packSize, price, _id } = req.body;
      console.log(req.body);
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
  }
};

// ...get all medicine
const getAllMedicine = async (req, res) => {
  try {
    let current = Number(req.query.page) || 1;
    // data limit
    let perPage = 8;
    // console.log("skip: ", perPage * current - perPage);
    console.log(current);
    const allMedicines = await Medicine.find({})
      .skip(perPage * current - perPage)
      .limit(perPage)
      .sort({ date: -1 });
    return res.status(200).json(allMedicines);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getSingleMedicine = async (req, res) => {
  try {
    const id = req.params.id;
    const med = await Medicine.findOne({ _id: id });
    return res.status(200).json(med);
  } catch (error) {
    return res.status(404).send("Not found");
  }
};

const searchMed = async (req, res) => {
  handleValidation(req, res);
  try {
    const { searchType, query } = req.body;
    let results;
    // get medicine by group
    if (searchType === "group") {
      results = await searchByGroup(query);
    }
    // get medicine by name
    if (searchType === "name") {
      results = await searchByName(query);
    }
    // if results not empty
    if (results.length !== 0) {
      return res.status(200).json(results);
    } else {
      // if empty
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// ...search medicine By Name/company
const searchByName = async (query) => {
  try {
    const medicines = await Medicine.find({ name: query });
    return medicines;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// search by group name
const searchByGroup = async (query) => {
  try {
    const medicine = await Medicine.find({ groupName: query });
    return medicine;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const validId = mongoose.isValidObjectId(req.query.id);
    // check if admin and id is valid
    if (req.user.isAdmin && validId) {
      const id = req.query.id;
      const resp = await Medicine.deleteOne({ _id: id });
      res.json(resp);
      console.log(resp);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

// ...validator and sanitizer
const validate = (method) => {
  switch (method) {
    case "addMedicine": {
      return [
        body("name").trim().notEmpty().withMessage("Name Required").escape(),
        body("desc").trim().notEmpty().withMessage("Description required"),
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
    case "query": {
      return [body("query").trim().notEmpty().escape()];
    }
  }
};

module.exports = {
  addMedicine,
  updateMedicine,
  getAllMedicine,
  getSingleMedicine,
  searchMed,
  deleteMedicine,
  validate,
};
