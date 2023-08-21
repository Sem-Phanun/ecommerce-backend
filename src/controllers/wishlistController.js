const db = require("../database/db");

const getAllwishlist = async (req, res) => {
  const { customer_id } = req.body;
  var sql = "SELECT * FROM tbl_wishlist WHERE customer_id = ?";
  // var sql = 'SELECT wishlist.id, pro.* tbl_wishlist wishlist'
  // sql += 'INNER JOIN tbl_product pro ON(pro.product_id = wishlist.product_id)'
  // sql += 'WHERE wishlist.customer_id = ?'
  const list = await db.query(sql, [customer_id]);
  res.json({
    list: list,
  });
  res.json({
    list: "wish list",
  });
};
// const getSingleWishlist = (req, res) => {
//   res.json({
//     list: "single wish list",
//   });
// };

const createWishlist = async (req, res) => {
  var { customer_id, product_id } = req.body;
  var sql = "INSERT INTO tbl_wishlist (customer_id, product_id) VALUES(?,?)";
  const param = [customer_id, product_id];
  const list = await db.query(sql, param);
  res.json({
    msg: 'prodcut wish list',
    list: list
  });
};
const removeWishlist = async (req, res) => {
    const {wishlist_id} = req.body
    var sql = 'DELETE FROM tbl_wishlist WHERE wishlist_id = ?'
    const data = await db.query(sql,[wishlist_id])
    res.json({
        list: data
    })
};
module.exports = {
  getAllwishlist,
//   getSingleWishlist,
  createWishlist,
  removeWishlist,
};
