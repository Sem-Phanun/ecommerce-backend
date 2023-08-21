const db = require('../database/db')

const getAll = async(req,res) => {
    const sql = 'SELECT * FROM tbl_order_status'
    const list = await db.query(sql)
    res.json({
        list: list
    })
}

const create = async(req,res) => {
    var { name, message, sort_order} = req.body
    const sql = 'INSERT INTO tbl_order_status (name,message,sort_order) VALUES(?,?,?)'
    const param = [name,message,sort_order]
    const list = await db.query(sql,param)
    res.json({
        list: list
    })
}

const remove = async (req,res) => {
    var { order_status_id } = req.body
    const sql = 'DELETE FROM tbl_order_status WHERE order_status_id =?'
    const data = await db.query(sql,[order_status_id])
    res.json({
        data: data
    })
}

module.exports = {
    getAll,create,remove
}