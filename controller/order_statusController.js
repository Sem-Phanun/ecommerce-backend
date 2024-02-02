import connect from '../config/db.js'

export const getAll = async(req,res) => {
    const sql = 'SELECT * FROM order_status'
    const list = await connect.query(sql)
    res.json({
        list: list
    })
}

export const create = async(req,res) => {
    var { name, message, sortOrder} = req.body
    const sql = 'INSERT INTO order_status (name,message,sort_order) VALUES(?,?,?)'
    const param = [name,message,sortOrder]
    const list = await connect.query(sql,param)
    res.json({
        list: list
    })
}

export const remove = async (req,res) => {
    var { orderStatusId } = req.body
    const sql = 'DELETE FROM order_status WHERE order_status_id =?'
    const data = await connect.query(sql,[orderStatusId])
    res.json({
        data: data
    })
}
