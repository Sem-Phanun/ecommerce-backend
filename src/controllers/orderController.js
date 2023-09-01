const db = require("../database/db");
const {isEmptyOrNull, invoiceNumber} = require("../helper/helper");

const generateInvoiceNo = async () => {
    const data = await db.query("SELECT MAX( order_id ) as id FROM `tbl_order`")
    return invoiceNumber(data[0].id)
}
const getAllOrderList = async (req, res) => {
  const list = await db.query("SELECT * FROM tbl_order");
  res.json({
    list: list,
  });
};
const getSignleOrder = async (req, res) => {
  const list = await db.query("SELECT * FROM tbl_order WHERE order_id = ?",[req.params.id]);
  res.json({
    data: list,
  });
};
const getOrderByCustomer = async (req, res) => {
  const { customer_id } = req.body;
  const list = await db.query("SELECT * FROM tbl_order WHERE customer_id =?",[customer_id]);
  res.json({
    list: list,
  });
};
//
const createOrder = async (req, res) => {
  try{
    db.beginTransaction();
    const {
      customer_id, address_id, payment_id, comment
    } = req.body;
    var msg = {}
    if(isEmptyOrNull(customer_id)){
      msg.customer_id = "Customer Id is required!"
    }
    if(isEmptyOrNull(payment_id)){
      msg.payment_id = "Payment Id is required!"
    }
    if(isEmptyOrNull(address_id)){
      msg.address_id = "Address Id is required!"
    }
    if(Object.keys(msg).length > 0){
      res.json({
        error: true,
        msg: msg
      })
      return false
    }
    //finding address customer info by address id (from client)
    const sqlAdress = "SELECT * FROM tbl_customer_address WHERE address_id =?"
    const address = await db.query(sqlAdress,[address_id])
    if(address?.length > 0){

      //object address filed
      const {first_name, last_name, tel, address_desc} = address[0]

      //finding total order
      const sqlSelectProduct = "SELECT cart.*, pro.price FROM tbl_cart cart "+
      "INNER JOIN tbl_product pro ON (cart.product_id = pro.product_id) "+
      "WHERE cart.customer_id =?" 
      const product = await db.query(sqlSelectProduct,[customer_id])
      if(product.length > 0) {
        //finding total amount base from cart by customer
        var order_total = 0

        product.forEach((item) => {
          order_total += item.quantity * item.price;
        });
        //insert data to table order
        var order_status_id = 1 //pending
        var invoice_no = await generateInvoiceNo()
        var sqlOrder = "INSERT INTO `tbl_order` "+
        "(customer_id, payment_id, order_status_id, invoice_no, comment, order_total, first_name, last_name, telephone, address_desc)"+
        "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const orderParam = [customer_id, payment_id, order_status_id, invoice_no, comment, order_total, first_name, last_name, tel, address_desc] 
        const order = await db.query(sqlOrder,orderParam)

        // Insert order details and update product quantities
        await Promise.all (
          product.map(async(item)=> {
            var sqlOderDetail = "INSERT INTO `tbl_order_detail` (order_id, product_id, quantity, price) VALUES(?, ?, ?, ?)"
            var orderDetailParam = [order.insertId, item.product_id, item.quantity, item.price]
            await db.query(sqlOderDetail,orderDetailParam)
            
            //cut stock from table product
            var sqlUpdateProdcut = "UPDATE tbl_product SET quantity=(quantity-?) WHERE product_id = ?"
            await db.query(sqlUpdateProdcut,[item.quantity, item.product_id])
  
          })
        )
        //clear cart by customer
        await db.query("DELETE FROM tbl_cart WHERE customer_id =? ", [customer_id])

        res.json({
          msg: "Your order is completed!",
          data: order
        })
        db.commit();
      }else {
        res.json({
          error: true,
          msg: "Your cart is empty!"
        })
      }
    }else {
      res.json({
        error: true,
        msg: "Error something..."
      })
    }
  }catch(error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while processing your order.",
    });
    db.rollback();
  }
};
const updateOrder = async (req, res) => {
  res.json({
    list: "order updated",
  });
};
const deleteOrder = async (req, res) => {
  res.json({
    list: "order was remove",
  });
};

module.exports = {
  getAllOrderList,
  getSignleOrder,
  getOrderByCustomer,
  createOrder,
  updateOrder,
  deleteOrder,
};

