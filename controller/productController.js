import connect from '../config/db.js'
import { validation } from '../helper/services.js';

export const getAllProduct = async (req, res) => {
  const sql = "SELECT * FROM product";

  //join category panigation search
  const data = await connect.query(sql);
  res.json({
    product: data,
  });
};
export const getSingleProduct = async (req, res) => {
  const id = id.params.id;
  const sql = "SELECT * FROM product";
  const list = await connect.query(sql, [id]);
  res.json({
    product: list,
  });
};
export const createProduct = async (req, res) => {
  var { category_id, barcode, product_name, quantity, price, image, description } =
    req.body;
  var filename = null
  if(req.file){
    filename = req.file.filename;
  }
  var msg = {};
  if (validation(category_id)) {
    msg.category_id = "category ID is required!";
  }
  if (validation(barcode)) {
    msg.barcode = "Barcode is required!";
  }
  if (validation(product_name)) {
    msg.product_name = "Product name is required!";
  }
  if (validation(quantity)) {
    msg.quantity = "Quantity is required!";
  }
  if (validation(price)) {
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
    "INSERT INTO product (category_id, barcode, product_name, quantity, price, image, description) VALUES(?, ?, ?, ?, ?, ?, ?)";
  const param = [
    category_id,
    barcode,
    product_name,
    quantity,
    price,
    filename,
    description,
  ];
  const list = await connect.query(sql, param);
  res.json({
    product: list,
  });
};
export const updateProduct = async (req, res) => {
  var { categoryId, barcode, name, quantity, price, image, description } =
    req.body;
  var msg = {};
  if (validation(categoryId)) {
    msg.categoryId = "category ID is required!";
  }
  if (validation(barcode)) {
    msg.barcode = "Barcode is required!";
  }
  if (validation(name)) {
    msg.name = "Product name is required!";
  }
  if (validation(quantity)) {
    msg.quantity = "Quantity is required!";
  }
  if (validation(price)) {
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
    "UPDATE product SET category_id =? , barcode =?, name =?, quantity =?, price =?, image =?, description =? WHERE product_id =?";
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
  const list = await connect.query(sql, param);
  res.json({
    data: list,
    body: req.body,
    file: req.files 
  });
};
export const removeProduct = async (req, res) => {
  const {id} = req.body
  var sql = "DELETE FROM product WHERE product_id = ?"
  const data = await connect.query(sql,[id])
  res.json({
    msg: "Product is remove!",
    data: data
  });
};
export const changeStatus = async (req, res) => {
  const {status} = req.body
  var sql = "UPDATE product SET status = ? WHERE product_id = ?"
  const list = await connect.query(sql,[status])
  res.json({
    msg: "Status is "+ (status == 0 ? "inactive":"active"),
    list: list
  })
};
