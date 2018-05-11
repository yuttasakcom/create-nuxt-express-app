const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGODB_URL ||
      "mongodb://localhost:27017/create-nuxt-express-app"
  )
  .then(() => console.log("Mongodb Connected!"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

app.set("port", port);

app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes"));

module.exports = app;
