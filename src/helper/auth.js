const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const db = require("../config/db")
dotenv.config()

exports.requireAuth = (req, res, next) => {
    const authorization = req.header(process.env.TOKEN_KEY)
    var token = null
    if(authorization != null && authorization != ""){
        token = authorization.split(" ")
        token = token[1]
    }
    if(token == null){
        res.status(401).send({message: "Unauthorized!"})
    }else{
        jwt.verify(token, process.env.SECRET_KEY, (error, data)=> {
            if(error){
                res.status(401).send({message: "Unauthorized!"})
            }else{
                res.user = data;
                next();
            }
        })
    }
}

exports.getPermission = async (id) => {
    var sql = "SELECT " +
    " p.code" +
    " FROM tbl_staff staff" +
    " INNER JOIN tbl_role r ON staff.role_id = r.role_id" +
    " INNER JOIN tbl_role_permission rp ON r.role_id = rp.role_id" +
    " INNER JOIN tbl_permission p ON rp.permission_id = p.permission_id" +
    " WHERE staff.staff_id = ?"
    var list = await db.query(sql,[id])
    var tmpArr = []
    list.forEach((item) => {
        tmpArr.push(item.code);
    });
    return tmpArr;
}
