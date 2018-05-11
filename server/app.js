const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.set("port", port);

app.use(require("./routes"));

module.exports = app;
