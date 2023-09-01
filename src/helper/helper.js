exports.isEmptyOrNull = (value) => {
  if (value == "" || value == null || value == undefined) {
    return true;
  }
};

exports.invoiceNumber = (number) => {
  var str = "" + (number+1)
  var pad = "000"
  var invoice = pad.substring(0, pad.length - str.length) + str
  return "INV"+ invoice
}

exports.productBarcode = (number) => {
  var str = "" + (number+1)
  var pad = "P000"
  var barcode = pad.substring(0, pad.length - str.length)+ str
  return barcode
}