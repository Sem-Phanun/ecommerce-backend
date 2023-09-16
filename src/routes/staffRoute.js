const express = require("express")
const router = express.Router();
const staffController = require('../controllers/staffController')
const { requestAuth } = require("../helper/auth")
const baseUrl = "/api/staff"



router.get(`${baseUrl}`, requestAuth , staffController.getAllStaffList)
router.get(`${baseUrl}/:id`,requestAuth, staffController.getSingleStaff)
router.post(`${baseUrl}`, staffController.staffRegisterInfo)
router.post(`${baseUrl}/auth/login`, staffController.login)
router.put(`${baseUrl}`, requestAuth, staffController.updateStaffInfo)
router.post(`${baseUrl}/setpassword`, staffController.setPassword)
router.delete(`${baseUrl}/:id`,requestAuth, staffController.deleteStaffInfo)
router.post(`${baseUrl}_refresh_token`, staffController.refreshToken)



module.exports = router