const staffController = require('../controllers/staffController')
const { userGuard } = require("../helper/auth")
const routeName = '/api/staff'
const staff = (app) => {
    app.get(`${routeName}`, userGuard, staffController.getAllStaffList)
    app.get(`${routeName}/:id`,userGuard, staffController.getSingleStaff)
    app.post(`${routeName}`, staffController.createStaffInfo)
    app.post(`${routeName}/auth/login`, staffController.login)
    app.put(`${routeName}`, userGuard, staffController.updateStaffInfo)
    app.put(`${routeName}/setpassword`, userGuard, staffController.setPassword)
    app.delete(`${routeName}/:id`,userGuard, staffController.deleteStaffInfo)
}
module.exports = staff