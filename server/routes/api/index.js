const router = require("express").Router();

const users = require("./users");
router.use("/users", users);

const apiNotSupport = require("./404");
router.use(apiNotSupport);

const error = require("./error");
router.use(error);

module.exports = router;
