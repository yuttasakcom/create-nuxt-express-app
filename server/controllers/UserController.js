const os = require("os");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const validateCreateUser = require("../validations/users/create");
const UserResponse = require("../responses/UserResponse");

exports.get = async (req, res, next) => {
  const pageNumber = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const skip = (pageNumber - 1) * pageSize;
  const timeQuery = req.query.time || Date.now();

  try {
    const result = User.find({ createdAt: { $lte: Number(timeQuery) } })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const countAll = User.find().count();

    const response = await Promise.all([result, countAll]);

    const pageAll = Math.ceil(response[1] / pageSize);

    let nextPage = "";
    if (pageNumber < pageAll) {
      nextPage = `${process.env.HOSTNAME}/api/users/?page=${pageNumber + 1}`;
    }

    let prevPage = "";
    if (pageNumber > 1) {
      prevPage = `${process.env.HOSTNAME}/api/users/?page=${pageNumber - 1}`;
    }

    res.json({
      success: true,
      data: UserResponse.all(response[0]),
      countData: response[0].length,
      countAll: response[1],
      currentPage: parseInt(pageNumber),
      pageSize,
      pageAll,
      nextPage,
      prevPage
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const { errors, isValid } = validateCreateUser(req.body);

  if (!isValid) {
    next({ status: 422, message: errors });
    return;
  }

  const { email, password } = _.pick(req.body, ["email", "password"]);

  try {
    const user = await User.findOne({ email });

    if (user && user.status === "registered") {
      console.log("A");
      errors.email = "Email aready exists";
      next({ status: 422, message: errors });
      return;
    }

    if (user && user.status === "requested") {
      res.json({ success: true, message: "Send email!" });
      return;
    }

    const newUser = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) {
          next(err);
          return;
        }

        newUser.password = hash;
        const result = await newUser.save();
        res.json({ success: true, data: UserResponse.one(result) });
      });
    });
  } catch (err) {
    next(err);
  }
};
