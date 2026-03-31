const User = require("../server/model/userModel");
const bcrypt = require("bcryptjs");
const adminSeeder = async () => {
  const isAdminExists = await User.findOne({ userEmail: "admin@gmail.com" });
  if (!isAdminExists) {
    await User.create({
      userEmail: "admin@gmail.com",
      userPassword: bcrypt.hashSync("admin", 10),
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
};

module.exports = adminSeeder;
