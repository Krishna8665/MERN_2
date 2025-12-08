const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MANGO_URI);
    console.log("Mongo DB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
