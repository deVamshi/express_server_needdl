const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { dp } = require("./misc/helpers");
const usersRoute = require("./routes/user");
const notFound = require("./middleware/not-found");

app.use(express.json());

app.use("/api/v1/user", usersRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => dp("http://localhost:" + port));
  } catch (err) {
    dp(err);
  }
};

start();
