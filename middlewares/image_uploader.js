const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "images/product_images");
  },
  filename: (req, file, callBack) => {
    callBack(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // valid file
  } else {
    cb(null, false); // invalid file
  }
};

exports.imageUploader =  (req, res, next) => {
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image");
  next()
};
