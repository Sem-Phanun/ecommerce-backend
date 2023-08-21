const db = require("../database/db");
const bcrypt = require("bcrypt");
const isEmptyOrNull = require("../helper/helper");

const getCustomerList = async (req, res) => {
  const data = await db.query('SELECT customer_id, first_name, last_name, gender,status FROM tbl_customer')
  res.json({
    data: data
  })
  // let sql =
  //   "SELECT customer_id, first_name, last_name, gender,status FROM tbl_customer";
  // db.query(sql, (error, row) => {
  //   if (!error) {
  //     res.json({
  //       msg: "Customer list",
  //       list: row,
  //     });
  //   } else {
  //     res.json({
  //       error: true,
  //       msg: error,
  //     });
  //   }
  // });
};

const getOneCustomer = (req, res) => {
  let id = req.params.id;
  let sql =
    "SELECT customer_id, first_name, last_name, gender,status FROM tbl_customer WHERE customer_id = ?";
  db.query(sql, [id], (error, row) => {
    if (!error) {
      res.json({
        msg: "select one customer success!",
        list: row,
      });
    } else {
      res.json({
        error: true,
        msg: error,
      });
    }
  });
};

//create customer address and customer
const createCustomerAddress = (req, res) => {
  db.beginTransaction()
  var {
    username,
    password,
    first_name,
    last_name,
    gender,
    province_id,
    tel,
    address_desc,
  } = req.body;

  //validation users checking
  var msg = {};
  if (isEmptyOrNull(username)) {
    msg.username = "username is required!";
  }
  if (isEmptyOrNull(password)) {
    msg.password = "password is required!";
  }
  if (isEmptyOrNull(first_name)) {
    msg.first_name = "fistname is required!";
  }
  if (isEmptyOrNull(last_name)) {
    msg.last_name = "lastname is required!";
  }
  if (isEmptyOrNull(gender)) {
    msg.gender = "gender is required!";
  }
  if (isEmptyOrNull(province_id)) {
    msg.province_id = "province is required!";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }

  var sqlFind = "SELECT customer_id FROM tbl_customer WHERE username = ?"; //customer checking by username
  db.query(sqlFind, [username], (error, results) => {
    if (error) {
      console.error("Database Error", error);
      return res.status(500).json({
        error: true,
        msg: "Database error",
      });
    }
    if (results.length > 0) {
      //has record user
      res.json({
        error: true,
        msg: "Account already exist!",
      });
    } else {
      //bcryption password
      password = bcrypt.hashSync(password, 10);

      var sqlCustomer =
        "INSERT INTO tbl_customer (first_name, last_name, gender, username, password) VALUES(?, ?, ?, ?, ?)";
      var sqlParamCustomer = [
        first_name,
        last_name,
        gender,
        username,
        password,
      ];
      db.query(sqlCustomer, sqlParamCustomer, (error2, results2) => {
        if (!error2) {
          //inserting customer address
          var sqlCustomerAddress =
            "INSERT INTO tbl_customer_address (customer_id, province_id, first_name, last_name, tel, address_desc) VALUES(?, ?, ?, ?, ?, ?)";
          var paramCustomerAddress = [
            results2.insertId,
            province_id,
            first_name,
            last_name,
            tel,
            address_desc,
          ];
          db.query(
            sqlCustomerAddress,
            paramCustomerAddress,
            (error3, results3) => {
              if (!error3) {
                res.json({
                  msg: "Account created!",
                  data: results3,
                });
                db.commit()
              } else {
                db.rollback()
                res.json({
                  error: true,
                  msg: error3,
                });
              }
            }
          );
        }
      });
    }
  });
};

//handle update information of customer
const updateCustomer = (req, res) => {
  var { customer_id, username, first_name, last_name, gender } = req.body;

  var msg = {};
  if (isEmptyOrNull(customer_id)) {
    msg.customer_id = "customer ID is required!";
  }
  if (isEmptyOrNull(first_name)) {
    msg.first_name = "First Name is required!";
  }
  if (isEmptyOrNull(last_name)) {
    msg.last_name = "Last Name is required!";
  }
  if (isEmptyOrNull(gender)) {
    msg.last_name = "Gender is required!";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }
  let sql =
    "UPDATE tbl_customer SET first_name = ?, last_name = ?, username = ?, gender =? WHERE customer_id =?";
  let sql_param = [first_name, last_name, username, gender, customer_id];
  db.query(sql, sql_param, (error, row) => {
    if (!error) {
      res.json({
        msg:
          row.affectedRows != 0
            ? "customer information updated!"
            : "customer information update faild",
        data: row,
      });
    } else {
      res.json({
        error: true,
        msg: error,
      });
    }
  });
};

//handle delete customer record
const removeCustomer = (req, res) => {
  let id = req.params.id;
  let sql = "UPDATE tbl_customer SET status = 0 WHERE customer_id = ?";
  let param_id = [id];
  db.query(sql, param_id, (error, row) => {
    if (!error) {
      res.json({
        msg:
          row.affectedRows != 0
            ? "Customer information remove success"
            : "Delete faild!",
        data: row,
      });
    } else {
      res.json({
        error: true,
        msg: error,
      });
    }
  });
};

//handle list of address
const addressList = async(req, res) => {
  var {
    customer_id
  } = req.body
  const list = await db.query('SELECT * FROM tbl_customer_address WHERE customer_id=?',[customer_id])
  res.json({
    msg: 'address list',
    list: list
  })
  // var sql = "SELECT * FROM tbl_customer_address WHERE customer_id=?";
  // db.query(sql,[customer_id], (error, row) => {
  //   if (!error) {
  //     res.json({
  //       list: row
  //     });
  //   } else {
  //     res.json({
  //       error: true,
  //       msg: error,
  //     });
  //   }
  // });
};

//catch one of customer address
const getOneAddress = async (req, res) => {
  let id = req.params.id
  const list = await db.query('SELECT * FROM tbl_customer_address WHERE address_id= ?',[id])
  res.json({
    msg: 'address list',
    list: list
  })
  // var sql = 'SELECT * FROM tbl_customer_address WHERE address_id= ?'
  // db.query(sql,[customer_id],(error,row)=> {
  //   if(!error){
  //       res.json({
  //         msg: row.affectRows != 0 ? 'address list': 'address not found',
  //         list: row
  //       })
  //   }else {
  //     res.json({
  //       error: true,
  //       msg: error
  //     })
  //   }
  // })
};

//handle add new address of customer
const addNewAddress = (req, res) => {
  var {
    customer_id,
    first_name,
    last_name,
    tel,
    province_id,
    address_desc
  } = req.body

  var msg = {}
  if(isEmptyOrNull(customer_id)){
    msg.customer_id = 'Customer ID is required!'
  }
  if(isEmptyOrNull(first_name)){
    msg.first_name = 'First Name is required!'
  }
  if(isEmptyOrNull(last_name)){
    msg.last_name = 'Last Name is required!'
  }
  if(isEmptyOrNull(tel)){
    msg.tel = 'Telephone is required!'
  }
  if(isEmptyOrNull(province_id)){
    msg.province_id = 'Province id is required!'
  }
  if(isEmptyOrNull(address_desc)){
    msg.address_desc = 'Address description is required!'
  }

  if(Object.keys(msg).length > 0){
    res.json({
      error: true,
      msg: msg
    })
    return false
  }

  var sql = "INSERT INTO tbl_customer_address (customer_id, province_id, first_name, last_name, tel, address_desc) VALUES(?,?,?,?,?,?)"
  var param = [customer_id, province_id, first_name, last_name, tel, address_desc]
  db.query(sql,param,(error,row)=> {
    if(!error){
      res.json({
        msg: row.affectedRows != 0
        ? "create success!"
        : "create faild!",
        list: row
      })
    }else{
      res.json({
        error: true,
        msg: error
      })
    }
  })
};

//handle update on address
const updateAddress = (req, res) => {
  var {
    address_id,
    customer_id,
    first_name,
    last_name,
    tel,
    province_id,
    address_desc
  } = req.body

  var msg = {}
  if(isEmptyOrNull(address_id)){
    msg.address_id = 'Address ID is required!'
  }
  if(isEmptyOrNull(customer_id)){
    msg.customer_id = 'Customer ID is required!'
  }
  if(isEmptyOrNull(first_name)){
    msg.first_name = 'First Name is required!'
  }
  if(isEmptyOrNull(last_name)){
    msg.last_name = 'Last Name is required!'
  }
  if(isEmptyOrNull(tel)){
    msg.tel = 'Telephone is required!'
  }
  if(isEmptyOrNull(province_id)){
    msg.province_id = 'Province id is required!'
  }
  if(isEmptyOrNull(address_desc)){
    msg.address_desc = 'Address description is required!'
  }

  if(Object.keys(msg).length > 0){
    res.json({
      error: true,
      msg: msg
    })
    return false
  }

  var sql = "UPDATE tbl_customer_address SET customer_id = ?, province_id = ?, first_name = ?, last_name = ?, tel = ? , address_desc =?"
  var param = [customer_id, province_id, first_name, last_name, tel, address_desc, address_id]
  db.query(sql,param,(error,row)=> {
    if(!error){
      res.json({
        msg: row.affectedRows != 0
            ? "update success!"
            : "update faild!",
        list: row
      })
    }else{
      res.json({
        error: true,
        msg: error
      })
    }
  })
};

//hanle delete address record of customer
const removeAddress = (req, res) => {
  let id = req.params.id
  const sql = "DELETE FROM tbl_customer_address WHERE address_id =?"
  db.query(sql,[id],(error,row)=> {
    if(!error){
      res.json({
        msg: row.affectedRows ? "Delete success": "Delete failed",
        list: row
      })
    }else{
      res.json({
        error: true,
        msg: error
      })
    }
  })
};

module.exports = {
  getCustomerList,
  getOneCustomer,
  createCustomerAddress,
  updateCustomer,
  removeCustomer,
  addressList,
  getOneAddress,
  addNewAddress,
  updateAddress,
  removeAddress,
};
