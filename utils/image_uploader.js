import multer from 'multer'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs';


const fileStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'images/product_images')
  },
  filename: (req, file, callBack) => {
    callBack(null, uuidv4() + '-' + file.originalname)
  }
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

const resize = async (image, imageWidth, fileNamePrefix, deleteImage) => {
  
  try {
    const resizedImage = 'images/product_images/' + fileNamePrefix + image.filename
    
    await sharp(image.path)
      .resize({
        width: imageWidth
      })
      .toFile('./' + resizedImage)

    if(deleteImage){
      fs.unlinkSync(image.path)
    }  

    return resizedImage


  } catch (error) {
    console.log('resize', error)
  }
}

export const imageResize = resize

export const imageUploader = multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).array('image')
