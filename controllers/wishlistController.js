import  connect from "../config/db.js";

export const getAllwishlist = async (req, res) => {
  const { customer_id } = req.body;
  var sql = "SELECT * FROM tbl_wishlist WHERE customer_id = ?";
  const list = await connect.query(sql, [customer_id]);
  res.json({
    list: list,
  });
  res.json({
    list: "wish list",
  });
};

export const createWishlist = async (req, res) => {
  var { customer_id, product_id } = req.body;
  var sql = "INSERT INTO tbl_wishlist (customer_id, product_id) VALUES(?,?)";
  const param = [customer_id, product_id];
  const list = await connect.query(sql, param);
  res.json({
    msg: 'prodcut wish list',
    list: list
  });
};
export const removeWishlist = async (req, res) => {
    const {wishlist_id} = req.body
    var sql = 'DELETE FROM tbl_wishlist WHERE wishlist_id = ?'
    const data = await connect.query(sql,[wishlist_id])
    res.json({
        list: data
    })
};
