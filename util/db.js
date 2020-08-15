require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    process.env.MONGO_URI ||
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    () => console.log("database connected")
  );
};

module.exports = { connectDb };
