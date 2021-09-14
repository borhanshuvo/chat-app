// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const loginRoute = require("./router/loginRouter");
const usersRoute = require("./router/usersRouter");
const inboxRoute = require("./router/inboxRouter");

// internal imports
const {
  notFoundHandler,
  defaultErrorHandler,
} = require("./middlewares/common/errorHandeler");

const app = express();
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Databae Connected"))
  .catch((err) => console.log(err));

// Request process
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Set  static folder
app.use(express.static(path.join(__dirname, "public")));

// Perse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//Routing setup
app.use("/", loginRoute);
app.use("/users", usersRoute);
app.use("/inbox", inboxRoute);

// 4O4 not found
app.use(notFoundHandler);

// Common error handeler
app.use(defaultErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app listening at ${process.env.PORT}`);
});
