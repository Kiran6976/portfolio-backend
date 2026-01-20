const Folder = require("../Model/Folder");
const cloudinary = require("../config/cloudinary");

module.exports = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const result = await cloudinary.uploader.upload_stream(
      { folder: "portfolio" },
      async (error, result) => {
        if (error) return res.status(500).json({ error: error.message });

        const folder = await Folder.create({
          name,
          coverImage: result.secure_url,
        });

        res.json(folder);
      }
    ).end(req.file.buffer);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
