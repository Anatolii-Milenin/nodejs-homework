const handleObjectIdError = (err, req, res, next) => {
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(404).json({ message: "Not found" });
  }
  next(err);
};

module.exports = handleObjectIdError;
