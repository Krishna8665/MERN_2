const mongoose = require("mongoose");
const adminSeeder = require("../adminSeeder");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected Successfully");
    adminSeeder();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // stop app if DB is down
  }
};

module.exports = connectDB;
