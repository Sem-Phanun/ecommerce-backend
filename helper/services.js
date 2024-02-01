import multer from "multer";

export const validation = (value) => {
  if (value == "" || value == null || value == undefined) {
    return true;
  }
  return false;
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

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback){
      callback(null, "public/upload/")
    },
    filename: function (req, file, callback){
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()* 1E9)
      callback(null, file.originalname + "-" + uniqueSuffix)
    }
  }),
  limits: {
    fileSize: 1024*1024*3
  },
  fileFilter:(req, file, callback) => {
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' !== 'image/jpic') {
      callback(null, false)
    }else {
      callback(null, true)
    }
  }
})