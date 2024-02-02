import database from '../config/db.js'

export const getPermission = async (id) => {
    var sql = "SELECT " +
    " p.code" +
    " FROM employee emp" +
    " INNER JOIN role r ON emp.role_id = r.role_id" +
    " INNER JOIN permission_role rp ON r.role_id = rp.role_id" +
    " INNER JOIN permission p ON rp.permission_id = p.permission_id" +
    " WHERE emp.employee_id = ?"
    var list = await database.query(sql,[id])
    var tmpArr = []
    list.forEach((item) => {
        tmpArr.push(item.code);
    });
    return tmpArr;
}