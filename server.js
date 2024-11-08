require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const isSignedIn = require("./middleware/is-signed-in.js");
const connectDB = require("./db/db.js");
const authRouter = require("./routers/auth.js");
const foodsRouter = require("./routers/food.js");
const usersRouter = require("./routers/user.js");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use(isSignedIn);
app.use("/users/foods", foodsRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT ? process.env.PORT : "5001";

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}!`);
});
