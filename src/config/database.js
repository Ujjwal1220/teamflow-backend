const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://teamflow:<PASSWORD>@cluster0.cieqwhz.mongodb.net/"
  );
};

module.exports = connectDB;
