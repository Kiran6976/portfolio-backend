const Message = require("../Model/Message");

module.exports = async (req, res) => {
  try {
    const data = await Message.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
