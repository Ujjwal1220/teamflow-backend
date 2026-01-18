const connectDB = require("./config/database");
const app = require("./App");
require("dotenv").config();

console.log("Starting the server...");
connectDB()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(7777, () => {
      console.log("Server is running on http://localhost:7777");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
