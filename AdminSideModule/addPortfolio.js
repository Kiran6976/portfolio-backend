const Portfolio = require("../Model/Portfolio");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    const { title, description, folderId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const newItem = await Portfolio.create({
      title,
      description,
      folderId,
      image: result.secure_url,
    });

    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
