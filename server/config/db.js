const mongoose = require("mongoose");

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = main;
