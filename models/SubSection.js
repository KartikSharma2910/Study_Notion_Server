const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  VideoUrl: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
