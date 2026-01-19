const Message = require("../Model/Message");

module.exports = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All required fields missing" });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    res.json({ success: true, data: newMessage });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
