const router = require("express").Router();

const { varifyToken } = require("../util/utils");
const tipsController = require("../controller/TipsController");

// ...create new tips
router.post(
  "/add",
  varifyToken, //..check if logged in
  tipsController.validate("createTips"),
  tipsController.createTips
);

// ...Update  tips
router.post(
  "/update",
  varifyToken, //..check if logged in
  tipsController.validate("createTips"),
  tipsController.updataTips
);

// ...get all tipses
router.get("/all", tipsController.getAllTipses);

// get detail of tips
router.get("/detail/:id", tipsController.getTipsDetail);

module.exports = router;
