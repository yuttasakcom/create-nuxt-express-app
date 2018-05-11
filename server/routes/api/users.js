const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("GET /api/users");
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const errors = {};

  if (id === "ab12") {
    errors.user = "Ban";
    next({ status: 422, message: errors });
    return;
  }

  res.json({
    success: true,
    path: `GET /api/users/${id}`,
    data: { id, name: "YoYea" }
  });
});

module.exports = router;
