const Folder = require("../Model/Folder");
const Portfolio = require("../Model/Portfolio");

module.exports = async (req,res)=>{
  const folderId = req.params.id;

  await Portfolio.deleteMany({ folderId });
  await Folder.findByIdAndDelete(folderId);

  res.json({ success:true });
};
