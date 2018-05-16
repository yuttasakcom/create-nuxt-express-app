const assert = require("assert");
const User = require("../../../../server/models/User");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/testing");
mongoose.connection.on("error", err => console.warn("Warning ", err));

afterEach(done => {
  const { users } = mongoose.connection.collections;
  users.drop(() => {
    done();
  });
});

describe("models User", () => {
  it("saves a user", done => {
    const user = new User({
      email: "test@example.com",
      password: "secret"
    });

    user.save().then(() => {
      assert(!user.isNew);
      done();
    });
  });
});
