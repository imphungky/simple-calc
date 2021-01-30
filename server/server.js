const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const usersRouter = require("./routes/users.js");
const coursesRouter = require("./routes/courses.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const jsonParser = bodyParser.json();

const app = express(); //server
app.use(cookieParser());
const port = process.env.PORT || 5000;

const uri = process.env.PROJECT_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}); //Use mongoose to connect to the database

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("connected to MongoDB");
}); //open the connection to mongodb

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
); //middleware
app.use(express.json()); //send and receive json files
app.use("/users", usersRouter);
app.use("/courses", coursesRouter);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
