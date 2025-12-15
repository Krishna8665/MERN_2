const mongoose = require("mongoose");
const User = require("../model/userModel");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
    //Admin seeding
    const isAdminExists = await User.findOne({ userEmail: "admin@gmail.com" });
    if (!isAdminExists) {
      await User.create({
        userEmail: "admin@gmail.com",
        userPassword: "admin",
        userPhoneNumber: 9812345678,
        userName: "admin",
        role: "admin",
      });
      //       await User.bulkWrite([
      //   {
      //     updateOne: {
      //       filter: { userEmail: "admin1@gmail.com" },
      //       update: {
      //         $setOnInsert: {
      //           userEmail: "admin1@gmail.com",
      //           userPassword: await bcrypt.hash("admin123", 10),
      //           userPhoneNumber: 9812345678,
      //           userName: "Admin One",
      //           role: "admin",
      //         },
      //       },
      //       upsert: true,
      //     },
      //   },
      //   {
      //     updateOne: {
      //       filter: { userEmail: "admin2@gmail.com" },
      //       update: {
      //         $setOnInsert: {
      //           userEmail: "admin2@gmail.com",
      //           userPassword: await bcrypt.hash("admin123", 10),
      //           userPhoneNumber: 9812345679,
      //           userName: "Admin Two",
      //           role: "admin",
      //         },
      //       },
      //       upsert: true,
      //     },
      //   },
      // ]);

      console.log("Admin seeded successfully!!!");
    } else {
      console.log("Admin already seeded");
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // stop app if DB is down
  }
};

module.exports = connectDB;
