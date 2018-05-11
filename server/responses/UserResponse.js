const _ = require("lodash");

const fileds = ["id", "email", "status", "createdAt", "updatedAt"];

exports.one = obj => _.pick(obj, fileds);
exports.all = objs => objs.map(obj => _.pick(obj, fileds));
