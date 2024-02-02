import connect from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { validation } from "../helper/services.js"

dotenv.config();

export const getCustomerList = async (req, res) => {
  const data = await connect.query(
    "SELECT customer_id, first_name, last_name, email FROM customer"
  );
  res.json({
    data: data,
  });
};

export const getSingleCustomer = async (req, res) => {
  let id = req.params.id;
  let sql =
    "SELECT customer_id, first_name, last_name, email FROM customer WHERE customer_id = ?";
  await connect.query(sql, [id], (error, row) => {
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

//register
export const registerAndCreateAddress = async (req, res) => {
  await connect.beginTransaction();
  var { email, password, firstName, lastName, provinceId, tel, addressDes } = req.body;

  //validation checking
  var msg = {};
  if (validation(email)) {
    msg.email = "Email is required!";
  }
  if (validation(password)) {
    msg.password = "Password is required!";
  }
  if (validation(firstName)) {
    msg.firstName = "First Name is required!";
  }
  if (validation(lastName)) {
    msg.lastName = "Last Name is required!";
  }
  if (validation(provinceId)) {
    msg.provinceId = "Province is required!";
  }
  if(validation(tel)){
    msg.tel = "Telephone is required!"
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      msg: msg,
      error: true,
    });
    return false;
  }
  try {
    //customer checking by email
    const existUserQuery = "SELECT customer_id FROM customer WHERE email = ?";
    const existUser = await connect.query(existUserQuery, [email]);
    if (existUser.length > 0) {
      // User with the same email already exists
      res.json({
        error: true,
        msg: "Account already exist with this emial.",
      });
      return false;
    }
    var password = await bcrypt.hashSync(password, 10);
    var sqlCustomer =
      "INSERT INTO customer (role_id, first_name, last_name, email, password)" +
      " VALUES(5, ?, ?, ?, ?)";
    var customerParam = [firstName, lastName, email, password];
    const insertCustomer = await connect.query(sqlCustomer, customerParam);
    const customerId = insertCustomer.insertId;
    var sqlAddress =
      "INSERT INTO address" +
      " (customer_id, province_id, first_name, last_name, tel, address_des)" +
      " VALUES(?, ?, ?, ?, ?, ?)";
    var paramAddress = [
      customerId,
      provinceId,
      firstName,
      lastName,
      tel,
      addressDes,
    ];
    await connect.query(sqlAddress, paramAddress);
    res.json({
      msg: "Account Created",
      data: insertCustomer,
    });
    await connect.commit();
  }catch (error) {

    await connect.rollback();
    console.error("Error during registration:", error);

    // Send an appropriate error response to the client
    res.status(500).json({
      error: true,
      msg: "An error occurred during registration.",
    });
  }
};

//handle login
export const login = async (req, res) => {
  const { email, password } = req.body;
  var msg = {};
  if (validation(email)) {
    msg.email = "Plesase fill your email";
  }
  if (validation(password)) {
    msg.password = "Please fill your password";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }

  var user = await db.query("SELECT * FROM customer WHERE email =? ", [
    email,
  ]);
  if (user.length > 0) {
    var passwordDb = user[0].password; //get password from db
    var isCorrect = bcrypt.compareSync(password, passwordDb); //coparing password
    if (isCorrect) {
      var user = user[0];
      delete user.password; //delete colums password from object user.
      var obj = {
        user: user,
        permission: [],
        token: "", //generate token jwt
      };
      var access_token = jwt.sign(
        { data: { ...obj } },
        process.env.ACCESS_TOKEN
      );
      var refresh_token = jwt.sign(
        { data: { ...obj } },
        process.env.ACCESS_TOKEN
      );
      res.json({
        ...obj,
        access_token: access_token,
        resfresh_token: refresh_token,
      });
    } else {
      res.json({
        msg: "Password Incorrect",
        error: true,
      });
    }
  } else {
    res.json({
      message: "Account does't exist!. Please goto register!",
      error: true,
    });
  }
};

//handle update information of customer
export const updateCustomer = async (req, res) => {
  var { customerId, firstName, lastName, email } = req.body;

  var msg = {};
  if (validation(customerId)) {
    msg.customerId = "customer ID is required!";
  }
  if (validation(firstName)) {
    msg.firstName = "First Name is required!";
  }
  if (validation(lastName)) {
    msg.lastName = "Last Name is required!";
  }
  if (validation(email)) {
    msg.email = "Email is required!";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }
  let sql =
    "UPDATE customer SET first_name = ?, last_name = ? , email =? WHERE customer_id =?";
  let sql_param = [firstName, lastName, email, customerId];
  await connect.query(sql, sql_param, (error, row) => {
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
export const removeCustomer = async (req, res) => {
  let id = req.params.id;
  let sql = "UPDATE customer SET status = 0 WHERE customer_id = ?";
  let param_id = [id];
  await connect.query(sql, param_id, (error, row) => {
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
export const addressList = async (req, res) => {
  var { customerId } = req.body;
  const list = await connect.query(
    "SELECT * FROM address WHERE customer_id=?",
    [customerId]
  );
  res.json({
    msg: "address list",
    list: list,
  });
};

//catch one of customer address
export const getOneAddress = async (req, res) => {
  let id = req.params.id;
  const list = await connect.query(
    "SELECT * FROM address WHERE address_id= ?",
    [id]
  );
  res.json({
    msg: "address list",
    list: list,
  });
};

//handle add new address of customer
export const addNewAddress = async (req, res) => {
  var { customerId, firstName, lastName, email, provinceId, addressDes } =
    req.body;

  var msg = {};
  if (validation(customerId)) {
    msg.customerId = "Customer ID is required!";
  }
  if (validation(firstName)) {
    msg.firstName = "First Name is required!";
  }
  if (validation(lastName)) {
    msg.lastName = "Last Name is required!";
  }
  if (validation(email)) {
    msg.eamil = "Email is required!";
  }
  if (validation(provinceId)) {
    msg.provinceId = "Province id is required!";
  }
  if (validation(addressDes)) {
    msg.addressDes = "Address description is required!";
  }

  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }

  var sql =
    "INSERT INTO address (customer_id, province_id, first_name, last_name, email, address_des) VALUES(?,?,?,?,?,?)";
  var param = [customerId, provinceId, firstName, lastName, email, addressDes];
  await connect.query(sql, param, (error, row) => {
    if (!error) {
      res.json({
        msg: row.affectedRows != 0 ? "create success!" : "create faild!",
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

//handle update on address
export const updateAddress = async (req, res) => {
  var {
    addressId,
    customerId,
    firstName,
    lastName,
    tel,
    provinceId,
    addressDes,
  } = req.body;

  var msg = {};
  if (validation(addressId)) {
    msg.addressId = "Address ID is required!";
  }
  if (validation(customerId)) {
    msg.customerId = "Customer ID is required!";
  }
  if (validation(firstName)) {
    msg.firstName = "First Name is required!";
  }
  if (validation(lastName)) {
    msg.lastName = "Last Name is required!";
  }
  if (validation(tel)) {
    msg.tel = "Telephone is required!";
  }
  if (validation(provinceId)) {
    msg.provinceId = "Province id is required!";
  }
  if (validation(addressDes)) {
    msg.addressDes = "Address description is required!";
  }

  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }

  var sql =
    "UPDATE address SET customer_id = ?, province_id = ?, first_name = ?, last_name = ?, email = ? , address_des =?";
  var param = [
    customerId,
    provinceId,
    firstName,
    lastName,
    email,
    addressDes,
    addressId,
  ];
  await connect.query(sql, param, (error, row) => {
    if (!error) {
      res.json({
        msg: row.affectedRows != 0 ? "update success!" : "update faild!",
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

//hanle delete address record of customer
export const removeAddress = async (req, res) => {
  let id = req.params.id;
  const sql = "DELETE FROM address WHERE address_id =?";
  await connect.query(sql, [id], (error, row) => {
    if (!error) {
      res.json({
        msg: row.affectedRows ? "Delete success" : "Delete failed",
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
