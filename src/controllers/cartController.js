const db = require("../config/db");
const {validation} = require("../helper/helper");
const cart = require("../routes/cartRoute");

const getByCustomer = async (req, res) => {
  const { customer_id } = req.body;
  // var sql = 'SELECT * FROM tbl_cart WHERE customer_id =?'
  var sql = "SELECT cart.cart_id, cart.quantity, pro.* FROM tbl_cart cart ";
  sql += "INNER JOIN tbl_product pro ON (cart.product_id = pro.product_id) ";
  sql += "WHERE cart.customer_id = ?";
  const list = await db.query(sql, [customer_id]);
  res.json({
    data: list,
  });
};

const addCart = async (req, res) => {
  const { customer_id, product_id, quantity } = req.body;
  var msg = {};
  if (validation(customer_id)) {
    msg.customer_id = "customer id is required!";
  }
  if (validation(product_id)) {
    msg.product_id = "prodcut id is required!";
  }
  if (validation(quantity)) {
    msg.quantity = "quantity is required!";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
  }
  var sql =
    "INSERT INTO tbl_cart (customer_id, product_id, quantity) VALUES(?,?,?)";
  const list = await db.query(sql, [customer_id, product_id, quantity]);
  res.json({
    msg: "cart has been add",
    data: list,
  });
};
const updateCart = async (req, res) => {
  const { cart_id, quantity } = req.body;
  var msg = {};
  if (validation(cart_id)) {
    msg.cart_id = "cart id is required!";
  }
  if (validation(quantity)) {
    msg.quantity = "quantity is required!";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
  }
  const sql =
    "UPDATE tbl_cart SET quantity=(quantity+?) WHERE = cart_id =? ";
  const list = await db.query(sql, [quantity,cart]);
  res.json({
    data: list,
  });
};
const removeCart = async (req, res) => {
  const { cart_id } = req.body;
  const sql = "DELETE FROM tbl_cat WHERE cart_id =? ";
  const data = await db.query(sql, [cart_id]);
  res.json({
    data: data,
  });
};
module.exports = {
  getByCustomer,
  addCart,
  updateCart,
  removeCart,
};
