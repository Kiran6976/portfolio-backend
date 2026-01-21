const Folder = require("../Model/Folder");

module.exports = async (req, res) => {
  try {
    const { name } = req.body;
    const folderId = req.params.id;

    let updateData = {};

    if (name) updateData.name = name;

    if (req.file) {
      updateData.coverImage = req.file.path; // already cloudinary url
    }

    const updated = await Folder.findByIdAndUpdate(
      folderId,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.error("Update folder error:", err);
    res.status(500).json({ error: err.message });
  }
};
