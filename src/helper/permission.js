const db = require("../config/db")
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