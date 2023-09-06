const db = require('../config/db')

const getAllPaymentMethod = async(req,res) => {
    const sql = 'SELECT * FROM tbl_payment_method'
    const payment = await db.query(sql)
    res.json({
        list: payment
    })
}

const createPaymentMethod = async(req,res) => {
    var { name, code } = req.body
    const sql = 'INSERT INTO tbl_payment_method (name, code) VALUES(?,?)'
    const param = [name,code]
    const payment = await db.query(sql,param)
    res.json({
        list: payment
    })
}

const removePaymentMethod = async(req,res) => {
    var { payment_id } = req.body
    const sql = 'DELETE FROM tbl_payment_method WHERE payment_id = ?'
    const payment = await db.query(sql,[payment_id])
    res.json({
        list: payment
    })
}

module.exports = {
    getAllPaymentMethod,
    createPaymentMethod,
    removePaymentMethod
}