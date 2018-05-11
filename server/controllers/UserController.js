const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const validateCreateUser = require("../validations/users/create");
const UserResponse = require("../responses/UserResponse");

exports.get = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      data: UserResponse.all(users)
    });
  } catch (err) {
    next(err);
  }
};

exports.create = (req, res, next) => {
  const { errors, isValid } = validateCreateUser(req.body);

  if (!isValid) {
    next({ status: 422, message: errors });
    return;
  }

  const { email, password } = _.pick(req.body, ["email", "password"]);

  User.findOne({ email })
    .then(user => {
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
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            next(err);
            return;
          }

          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json({ success: true, data: UserResponse.one(user) });
            })
            .catch(err => next(err));
        });
      });
    })
    .catch(err => next(err));
};
