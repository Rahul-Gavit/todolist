const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const db = require("./config/db");
const todoTasksRoutes = require("./routes/todoTaskRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

db();
app.use(bodyParser.json());

app.use(cors());
app.use("/api/v1/todo-list", todoTasksRoutes);

app.listen(port, () => {
  console.log(`Server Connected Successfully ${port}`);
});
