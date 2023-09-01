const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const db = require("../database/db")
dotenv.config()

exports.userGuard = (parameter) => {
    return (req,res,next) => {
        var authorization = req.headers.authorization;
        var token_from_client = null
        if(authorization != null && authorization != ""){
            token_from_client = authorization.split(" ");
            token_from_client = token_from_client[1];
        }
        if(token_from_client == null){
            res.status(401).send({
                message: "Unauthorized"
            })
        }else {
            jwt.verify(token_from_client, process.env.SECRET_KEY,(error, result))
            if(error){
                res.status(401).send({
                    message: "Unauthorized"
                })
            }else{
                var permission = result.data.user.permission
                req.user = result.user
                req.user_id = result.data.user.customer_id
                if(parameter == null){
                    next()
                }else if(permission.includes(parameter)){
                    next()
                }else {
                    res.status(401).send({
                        message: "Unauthorized"
                    })
                }
            }
        }
    }
}

exports.getPermissionUser = async (id) => {
    var sql = "SELECT * " +
    " p.code"+
    " FROM tbl_staff staff"+
    " INNER JOIN tbl_role r ON staff.role_id = r.role_id"+
    " INNER JOIN tbl_role_permission rp ON r.role_id = rp.role_id"+
    " INNER JOIN tbl_permission p ON rp.permission_id = p.permission_id"+
    " WHERE staff.staff_id = ?"
    var list = await db.query(sql,[id])
    var tmpArr = []
    list.map(item => {
        tmpArr.push(item.code)
    })
    // list.forEach(item => {
    //     tmpArr.push(item.code)
    // });
    return tmpArr;
}
