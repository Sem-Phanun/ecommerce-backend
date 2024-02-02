import connect from "../config/db.js"
import {validation} from "../helper/services.js"

export const getAllCategory = async(req, res) => {
  sql = 'SELECT * FROM category'
  await connect.query(sql,(error,row) => {
    if(error){
      res.json({
        msg: error,
        error: true,
      })
    }else {
      res.json({
        msg: "category list",
        list: row
      })
    }
  })
};

export const getOne = async (req, res) => {
  let id = req.params.id
  let sql = 'SELECT * FROM category WHERE category_id = ?'
  await bd.query(sql,[id],(error,row)=> {
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

export const createCategory = async (req, res) => {
  const {
    category_name,
    description,
    status,
  } = req.body;
  var msg = {}
  if(validation(category_name)){
    msg.category_name = "Category Name is required!"
  }
  if(Object.keys(msg).length > 0){
    res.json({
      error: true,
      msg: msg
    })
    return false;
  }
  let sql = 'INSERT INTO category (category_name , description, status) VALUES(?,?,?)'
  let data = [category_name,description,status]
  await connect.query(sql,data,(error,row)=> {
    if(!error){
      res.json({
        msg: 'category insert successful',
        cateogry: row
      })
    }else{
      res.json({
        error: true,
        msg: error
      })
    }
  })
};

export const updateCategory = async (req, res) => {
  const {
    categoryId,
    categoryName,
    description,
    status
  } = req.body
  var msg = {}
  if(validation(categoryName)){
    msg.categoryName = "Category Name is required!"
  }
  if(Object.keys(msg).length > 0){
    res.json({
      error: true,
      msg: msg
    })
    return false
  }
  let sql = 'UPDATE category SET category_name = ?, description = ?, status =? WHERE category_id =?'
  let param_sql = [categoryName, description, parentId, status, categoryId]
  await connect.query(sql,param_sql,(error,row)=>{
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

export const removeCategory = async (req, res) => {
  let id = req.params.id
  let sql = 'DELETE FROM category WHERE cateogry_id =?'
  let param_id = [id]
  await connect.query(sql,param_id,(error,row)=> {
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
