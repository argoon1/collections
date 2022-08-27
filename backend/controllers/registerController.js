function registerUser(req, res) {
  res.status(201).json({ message: "BASIC LOGIN TEST" });
}
module.exports = { registerUser };
