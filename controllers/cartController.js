import connect from '../config/db.js'
import {validation} from "../helper/services"

export const getByCustomer = async (req, res) => {
  const { customerId } = req.body;
  // var sql = 'SELECT * FROM tbl_cart WHERE customer_id =?'
  var sql = "SELECT cart.cart_id, cart.quantity, pro.* FROM tbl_cart cart ";
  sql += "INNER JOIN tbl_product pro ON (cart.product_id = pro.product_id) ";
  sql += "WHERE cart.customer_id = ?";
  const list = await connect.query(sql, [customerId]);
  res.json({
    data: list,
  });
};

export const addCart = async (req, res) => {
  const { customerId, productId, quantity } = req.body;
  var msg = {};
  if (validation(customerId)) {
    msg.customerId = "customer id is required!";
  }
  if (validation(productId)) {
    msg.productId = "prodcut id is required!";
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
  const list = await connect.query(sql, [customerId, productId, quantity]);
  res.json({
    msg: "cart has been add",
    data: list,
  });
};
const updateCart = async (req, res) => {
  const { cartId, quantity } = req.body;
  var msg = {};
  if (validation(cartId)) {
    msg.cartId = "cart id is required!";
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
  const list = await connect.query(sql, [quantity,cartId]);
  res.json({
    data: list,
  });
};
const removeCart = async (req, res) => {
  const { cartId } = req.body;
  const sql = "DELETE FROM tbl_cat WHERE cart_id =? ";
  const data = await connect.query(sql, [cartId]);
  res.json({
    data: data,
  });
};