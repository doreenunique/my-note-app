// connection.js

const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MongoDB_URI;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const db = mongoose
  .connect(URI, connectionParams)
  .then(() => {
    console.log(`Connected to the database`);
  })
  .catch((err) => console.log("Error connecting to the database", err));

module.exports = db;
