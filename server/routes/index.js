const router = require("express").Router();
const logger = require("morgan");

const api = require("./api");
router.use("/api", logger("common"), api);

module.exports = router;
