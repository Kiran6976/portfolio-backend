const Admin = require("../Model/Admin");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashed,
    });

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
