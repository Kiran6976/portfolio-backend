const express = require("express");
const router = express.Router();

// client
const sendMessage = require("../ClientSideModule/sendMessage");
const getPortfolio = require("../ClientSideModule/getPortfolio");

// admin
const addPortfolio = require("../AdminSideModule/addPortfolio");
const deletePortfolio = require("../AdminSideModule/deletePortfolio");
const createAdmin = require("../AdminSideModule/createAdmin");
const loginAdmin = require("../AdminSideModule/loginAdmin");
const getMessages = require("../AdminSideModule/getMessages");
const markAsRead = require("../AdminSideModule/markAsRead");
const deleteMessage = require("../AdminSideModule/deleteMessage");
const addFolder = require("../AdminSideModule/addFolder");
const Folder = require("../Model/Folder");
const getFolders = require("../AdminSideModule/getFolders");
const deleteFolder = require("../AdminSideModule/deleteFolder");
const updateFolder = require("../AdminSideModule/updateFolder");


const auth = require("../Middleware/auth");
const upload = require("../Middleware/upload");

router.get("/portfolio", getPortfolio);
router.get("/admin/messages", auth, getMessages);
router.post("/contact", sendMessage);

router.post("/admin/add-portfolio", auth, upload.single("image"), addPortfolio);
router.delete("/admin/portfolio/:id", auth, deletePortfolio);
router.post("/admin/create", createAdmin);
router.post("/admin/login", loginAdmin);
router.put("/admin/messages/read/:id", auth, markAsRead);
router.delete("/admin/messages/:id", auth, deleteMessage);
router.post("/admin/add-folder", auth, upload.single("image"), addFolder);
router.get("/folders", async (req,res)=>{
  const data = await Folder.find();
  res.json(data);
});
router.put(
  "/admin/folder/:id",
  auth,
  upload.single("image"),
  updateFolder
);

router.get("/folders", getFolders);
router.delete("/admin/folder/:id", auth, deleteFolder);

module.exports = router;
