const staffController = require('../controllers/staffController')
const { requireAuth } = require("../helper/auth")
const routeName = '/api/staff'
const staff = (app) => {
    app.get(routeName,requireAuth, staffController.getAllStaffList)
    app.get(`${routeName}/:id`,requireAuth, staffController.getSingleStaff)
    app.post(`${routeName}`, requireAuth, staffController.staffRegisterInfo)
    app.post(`${routeName}/auth/login`, staffController.login)
    app.put(`${routeName}`, requireAuth, staffController.updateStaffInfo)
    app.post(`${routeName}/setpassword`, staffController.setPassword)
    app.delete(`${routeName}/:id`,requireAuth, staffController.deleteStaffInfo)
    app.post(`${routeName}_refresh_token`, staffController.refreshToken)
}
module.exports = staff