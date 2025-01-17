import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb)  //Here cb is used for callback and file is used to store all the files.
    {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer(
    { storage,}
)