import express from 'express'
import multer from "multer";
import path from 'path'
import { fileURLToPath } from "url";
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/upload", express.static(path.join(__dirname, "public/upload")))


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "public/upload")
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()* 1E9)
    cb(null, "img-"+ uniqueSuffix + file.originalname)  
  }
})

export const upload = multer({ storage })

// export const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, callback){
//       callback(null, "public/upload/")
//     },
//     filename: function (req, file, callback){
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()* 1E9)
//       callback(null, file.originalname + "-" + uniqueSuffix)
//     }
//   }),
//   limits: {
//     fileSize: 1024*1024*3
//   },
//   fileFilter:(req, file, callback) => {
//     if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' !== 'image/jpic') {
//       callback(null, false)
//     }else {
//       callback(null, true)
//     }
//   }
// })


export const validation = (value) => {
  if (value == "" || value == null || value == undefined) {
    return true;
  }
  // return false;
};

export const invoiceNumber = (number) => {
  var str = "" + (number+1)
  var pad = "000"
  var invoice = pad.substring(0, pad.length - str.length) + str
  return "INV"+ invoice
}

export const productBarcode = (number) => {
  var str = "" + (number+1)
  var pad = "P000"
  var barcode = pad.substring(0, pad.length - str.length)+ str
  return barcode
}

