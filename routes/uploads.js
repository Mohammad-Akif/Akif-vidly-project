const express = require("express");
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const { Image } = require('../models/image');
const AppError = require("../utills/appError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },

  filename: (req, file, cb) => {
    const extention = file.mimetype.split('/')[1];
    cb(null, `image-${uuidv4()}-${Date.now()}.${extention}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    return cb(new AppError("Not an image! Please upload only images", 400), false);
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('image');

router.post('/image', upload, async (req, res) => {
  if (!req.file) res.status(400).send('Image file was not found.')

  const { destination, mimetype, size, filename } = req.file;

  const basePath = config.get('basePath');
  const url = `${basePath}/images/${req.file.filename}`;

  const sizeInMegabytes = size / 1024 / 1024;
  const sizeInBytes = size;

  let image = new Image({
    fileName: filename,
    fileType: mimetype,
    sizeInMegaBytes: sizeInMegabytes,
    sizeInBytes: sizeInBytes,
    destination: destination,
    completePath: url
  });

  try {
    await image.save();

    res.send({ imageUrl: url });
  } catch (ex) {
    console.log(ex.message)
    return res.send(ex.message);
  }
});

module.exports = router;