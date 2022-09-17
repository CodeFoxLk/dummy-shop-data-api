const multer = require('multer')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')

const fileStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'images/product_images')
  },
  filename: (req, file, callBack) => {
    callBack(null, uuidv4() + '-' + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true) // valid file
  } else {
    cb(null, false) // invalid file
  }
}

const resize = async (image, imageWidth) => {
  try {
    const thumbNailPtah = 'images/product_images/' + 'thumbNail-' + image.filename
    await sharp(image.path)
      .resize({
        width: imageWidth,
      })
      .toFile('./' + thumbNailPtah)

     return thumbNailPtah
  } catch (error) {
    console.log(error)
  }
}

exports.imageResize = resize

exports.imageUploader = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).array('image')
