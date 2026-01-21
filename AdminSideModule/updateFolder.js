const Folder = require("../Model/Folder");
const cloudinary = require("../config/cloudinary");

module.exports = async (req, res) => {
  try {
    const { name } = req.body;
    const folderId = req.params.id;

    let updateData = { name };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.coverImage = result.secure_url;
    }

    const updated = await Folder.findByIdAndUpdate(
      folderId,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
