const Message = require("../Model/Message");

module.exports = async (req,res)=>{
  await Message.findByIdAndDelete(req.params.id);
  res.json({success:true});
};