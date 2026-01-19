const Portfolio = require("../Model/Portfolio");

module.exports = async (req, res) => {
  try {
    const { category } = req.query;

    let data;

    if (category) {
      data = await Portfolio.find({ category });
    } else {
      data = await Portfolio.find();
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
