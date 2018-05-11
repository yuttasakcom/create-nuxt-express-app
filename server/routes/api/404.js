module.exports = (req, res, next) => {
  res.status(404).json({ sucess: false, message: "404 page not found" });
};
