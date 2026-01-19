const Message = require("../Model/Message");

module.exports = async (req,res)=>{
  await Message.findByIdAndUpdate(req.params.id,{isRead:true});
  res.json({success:true});
};
