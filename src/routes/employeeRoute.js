const express = require("express")
const router = express.Router();
const employeeController = require('../controllers/employeeController')
const { requestAuth } = require("../helper/auth")
const baseUrl = "/api/staff"


router.get(`${baseUrl}`, requestAuth , employeeController.getAllStaffList)
router.get(`${baseUrl}/:id`,requestAuth, employeeController.getSingleStaff)
router.post(`${baseUrl}`, employeeController.staffRegisterInfo)
router.post(`${baseUrl}/auth/login`, employeeController.login)
router.put(`${baseUrl}`, requestAuth, employeeController.updateStaffInfo)
router.post(`${baseUrl}/setpassword`, employeeController.setPassword)
router.delete(`${baseUrl}/:id`,requestAuth, employeeController.deleteStaffInfo)
router.post(`${baseUrl}_refresh_token`, employeeController.refreshToken)



module.exports = router