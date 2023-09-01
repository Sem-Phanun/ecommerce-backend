const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../database/db");
const { getPermissionUser } = require("../helper/auth");
const { isEmptyOrNull } = require("../helper/helper");
dotenv.config();

const getAllStaffList = async (req, res) => {
  const sql =
    "SELECT first_name AS FirstName, last_name AS LastName FROM tbl_staff";
  const list = await db.query(sql);
  res.json({
    list: list,
  });
};
const getSingleStaff = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM tbl_staff WHERE staff_id = ? ";
  const list = await db.query(sql, [id]);
  res.json({
    list: list,
  });
};
const createStaffInfo = async (req, res) => {
  const { role_id, first_name, last_name,username, password, tel, email, address, province } = req.body;
  var msg = {};
  if (isEmptyOrNull(first_name)) {
    msg.first_name = "First Name is required!";
  }
  if (isEmptyOrNull(last_name)) {
    msg.last_name = "Last Name is required!";
  }
  if (isEmptyOrNull(username)) {
    msg.tel = "Username is required!";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }
  const sql =
    "INSERT INTO tbl_staff (role_id, first_name, last_name, username, password, tel, email, address, province)" +
    "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const paramSql = [role_id, first_name, last_name, username, password, tel, email, address, province];
  const list = await db.query(sql, paramSql);
  res.json({
    list: list,
  });
};

const login = async (req, res) => {
  var { username, password } = req.body;
  var msg = {};
  if (isEmptyOrNull(username)) {
    msg.username = "Please fill username";
  }
  if (isEmptyOrNull(password)) {
    msg.password = "Please fill password";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      msg: msg,
      error: true,
    });
    return false;
  }
  const sql = "SELECT * FROM tbl_staff WHERE username = ?";
  var user = await db.query(sql, [username]);
  if (user.length > 0) {
    var passwordCompare = user[0].password; // get password from DB
    var isCorrect = bcrypt.compareSync(password, passwordCompare);
    if (isCorrect) {
      var user = user[0];
      delete user.password;
      var permission = await getPermissionUser(user.staff_id);
      var obj = {
        user: user,
        permission: permission,
      };
      var access_token = jwt.sign(
        { data: { ...obj } },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      var refresh_token = jwt.sign(
        { data: { ...obj } },
        process.env.SECRET_KEY
      );
      res.json({
        ...obj,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } else {
      res.json({
        msg: "Password incorrect!",
        error: true,
      });
    }
  } else {
    res.json({
      msg: "Account does't exist!. Please goto register",
      error: true,
    });
  }
};

const setPassword = async (req, res) => {
  const { username, password } = req.body;
  var msg = {};
  if (isEmptyOrNull(username)) {
    msg.username = "Please fill username";
  }
  if (isEmptyOrNull(password)) {
    msg.password = "Please fill password";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }
  const staff = "SELECT * FROM tbl_staff WHERE username = ?";
  const list = await db.query(staff, [username]);
  if (list.length > 0) {
    var passwordGenerate = bcrypt.hashSync(password, 10);
    var update = await db.query(
      "UPDATE tbl_staff SET password = ? WHERE username = ?",
      [passwordGenerate, username]
    );
    res.json({
      msg: "Password upated",
      data: update,
    });
  } else {
    res.json({
      msg: "Account does't exist!. Please goto register!",
      error: true,
    });
  }
};
const updateStaffInfo = async (req, res) => {
  const { staff_id, first_name, last_name, username, password, tel, email, address, province } =
    req.body;
  var msg = {};
  if (isEmptyOrNull(staff_id)) {
    msg.staff_id = "Staff id is required!";
  }
  if (isEmptyOrNull(first_name)) {
    msg.first_name = "First Name is required!";
  }
  if (isEmptyOrNull(last_name)) {
    msg.last_name = "Last Name is required!";
  }
  if (isEmptyOrNull(username)) {
    msg.tel = "Username is required!";
  }
  if (Object.keys(msg).length > 0) {
    res.json({
      error: true,
      msg: msg,
    });
    return false;
  }
  var sql =
    "UPDATE tbl_staff " +
    " SET first_name =? , last_name = ?,username =?, password = ?, tel = ?, email= ?, address = ? , province = ? WHERE staff_id =?";
  const staffParam = [
    first_name,
    last_name,
    username,
    password,
    tel,
    email,
    address,
    province,
    staff_id,
  ];
  const data = await db.query(sql, staffParam);
  res.json({
    data: data,
  });
};
const deleteStaffInfo = async (req, res) => {
  var { id } = req.params;
  var sql = "DELETE FROM tbl_staff WHERE staff_id =? ";
  const data = await db.query(sql, [id]);
  res.json({
    data: data,
  });
};
module.exports = {
  getAllStaffList,
  getSingleStaff,
  createStaffInfo,
  updateStaffInfo,
  deleteStaffInfo,
  login,
  setPassword,
};
