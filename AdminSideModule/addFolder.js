const Folder = require("../Model/Folder");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const folder = await Folder.create({
      name,
      coverImage: result.secure_url,
    });

    res.json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
