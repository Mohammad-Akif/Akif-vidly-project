const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  sizeInMegaBytes: {
    type: Number,
    required: true
  },
  sizeInBytes: {
    type: Number,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  completePath: {
    type: String,
    required: true
  }
});

const Image = mongoose.model('Image', imageSchema);

exports.Image = Image;
exports.imageSchema = imageSchema;