module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ sucess: false, error: err.message });
};
