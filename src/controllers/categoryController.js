const db = require("../database/db");

const getAllCategory = (req, res) => {
  sql = 'SELECT * FROM tbl_category'
  db.query(sql,(error,row) => {
    if(!error){
      res.json({
        msg: "category list",
        list: row
      })
    }else {
      res.json({
        msg: error,
        error: true
      })
    }
  })
};

const getOne = (req, res) => {
  let id = req.params.id
  let sql = 'SELECT * FROM category WHERE category_id = ?'
  bd.query(sql,[id],(error,row)=> {
    if(!error){
      res.json({
        msg: 'cagtegory select by id',
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

const createCategory = (req, res) => {
  const {
    category_name,
    description,
    parent_id,
    status,
  } = req.body
  let sql = 'INSERT INTO tbl_category (`category_name` , `description`, `parent_id`, `status`) VALUES(?,?,?,?)'
  let data = [category_name,description,parent_id,status]
  db.query(sql,data,(error,row)=> {
    if(!error){
      res.json({
        msg: 'category insert successful',
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

const updateCategory = (req, res) => {
  const {
    category_id,
    category_name,
    description,
    parent_id,
    status
  } = req.body
  let sql = 'UPDATE tbl_category SET category_name = ?, description = ?, parent_id =?, status =? WHERE category_id =?'
  let param_sql = [category_name,description,parent_id,status,category_id]
  db.query(sql,param_sql,(error,row)=>{
    if(!error){
      res.json({
        msg: row.affectedRows != 0 ? 'Category update success!' : 'category update faild!',
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

const removeCategory = (req, res) => {
  let id = req.params.id
  let sql = 'DELETE FROM tbl_category WHERE cateogry_id =?'
  let param_id = [id]
  db.query(sql,param_id,(error,row)=> {
    if(!error){
      res.json({
        msg: (row.affectedRows != 0) ? 'category remove success' : 'category remove faild',
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
  getAllCategory,
  getOne,
  createCategory,
  updateCategory,
  removeCategory,
};
