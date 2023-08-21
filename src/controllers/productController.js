const db = require("../database/db");
const isEmptyOrNull = require("../helper/helper");
const getAllProduct = async (req, res) => {
  const sql = "SELECT * FROM tbl_product";

  //join category panigation search
  const data = await db.query(sql);
  res.json({
    list: data,
  });
};
const getSingleProduct = async (req, res) => {
  const id = id.params.id;
  const sql = "SELECT * FROM tbl_product";
  const list = await db.query(sql, [id]);
  res.json({
    data: list,
  });
};
const createProduct = async (req, res) => {
  var { category_id, barcode, name, quantity, price, image, description } =
    req.body;
  var msg = {};
  if (isEmptyOrNull(category_id)) {
    msg.category_id = "category ID is required!";
  }
  if (isEmptyOrNull(barcode)) {
    msg.barcode = "Barcode is required!";
  }
  if (isEmptyOrNull(name)) {
    msg.name = "Product name is required!";
  }
  if (isEmptyOrNull(quantity)) {
    msg.quantity = "Quantity is required!";
  }
  if (isEmptyOrNull(price)) {
    msg.price = "Price is required!";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }

  const sql =
    "INSERT INTO tbl_product (category_id, barcode, name, quantity, price, image, description) VALUES(?, ?, ?, ?, ?, ?, ?)";
  const param = [
    category_id,
    barcode,
    name,
    quantity,
    price,
    image,
    description,
  ];
  const list = await db.query(sql, param);
  res.json({
    data: list,
  });
};
const updateProduct = async (req, res) => {
  var { category_id, barcode, name, quantity, price, image, description } =
    req.body;
  var msg = {};
  if (isEmptyOrNull(category_id)) {
    msg.category_id = "category ID is required!";
  }
  if (isEmptyOrNull(barcode)) {
    msg.barcode = "Barcode is required!";
  }
  if (isEmptyOrNull(name)) {
    msg.name = "Product name is required!";
  }
  if (isEmptyOrNull(quantity)) {
    msg.quantity = "Quantity is required!";
  }
  if (isEmptyOrNull(price)) {
    msg.price = "Price is required!";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }

  const sql =
    "UPDATE tbl_product SET category_id =? , barcode =?, name =?, quantity =?, price =?, image =?, description =? WHERE product_id =?";
  const param = [
    category_id,
    barcode,
    name,
    quantity,
    price,
    image,
    description,
    product_id,
  ];
  const list = await db.query(sql, param);
  res.json({
    data: list,
  });
};
const removeProduct = (req, res) => {
  res.json({
    list: "remove",
  });
};
const changeStatus = async (req, res) => {};
module.exports = {
  getAllProduct,
  getSingleProduct,
  createProduct,
  updateProduct,
  removeProduct,
  changeStatus,
};
