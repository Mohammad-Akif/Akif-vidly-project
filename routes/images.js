const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Image } = require("../models/image");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const async = require('async');
const AppError = require("../utills/appError");

router.get("/", [auth, admin], async (req, res) => {
  const images = await Image.find().select("-__v")
  const data = { images };

  res.send(data);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  async.waterfall([
    removeImageFromDatabase = callback => {
      Image
        .findByIdAndRemove(req.params.id)
        .then(image => {
          if (!image)
            return callback(new AppError('Image with the given id was not found.', 404));
          callback(null, image);
        }).catch(ex => {
          return callback(new AppError('Image with the given id was not found.', 404));
        });
    },
    removeImageFromFileSystem = (image, callback) => {
      const path = `./${image.destination}/${image.fileName}`;

      fs.unlink(path, (err) => {
        if (err)
          return callback(
            new AppError('Image with the given path was not found or may be removed.', 404)
          );
        callback(null, image);
      })
    }
  ], (err, result) => {
    if (!err) {
      return res.send('image successfully deleted.');
    } else {
      console.log(err)
      return res.status(err.statusCode).send(err.message);
    }
  });
});

router.get("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const image = await Image.findById(req.params.id).select("-__v");

  if (!image)
    return res.status(404).send("An image with the given ID was not found.");

  res.send(image);
});

module.exports = router;
