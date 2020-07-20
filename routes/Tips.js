const router = require("express").Router();

const { varifyToken } = require("../util/utils");
const tipsController = require("../controller/TipsController");

router.post(
  "/add",
  varifyToken,
  tipsController.validate("createTips"),
  tipsController.createTips
);

router.get("/all", tipsController.getAllTipses);

module.exports = router;
