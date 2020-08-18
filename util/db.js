require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Database connected----------------------");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDb };
