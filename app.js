const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { connectDb } = require("./util/db");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const medicineRouter = require("./routes/Medicine");
const tipsRouter = require("./routes/Tips");

const app = express();
app.use(cors({ origin: "*" }));

connectDb();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/medicine", medicineRouter);
app.use("/tips", tipsRouter);

module.exports = app;
