const express = require("express");
const  connectDB  = require("./database/connectDB");
const app = express();

require("dotenv").config();
connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server has started at PORT ${port}`);
});
