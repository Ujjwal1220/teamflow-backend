const express = require("express");
const authRouter = require("./routes/auth");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Teamflow!");
});
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api/users", userRoutes);

app.use("/", authRouter);

module.exports = app;
