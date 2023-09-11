const express = require("express")
const router = express.Router();
const staffController = require('../controllers/staffController')
const { requireAuth } = require("../helper/auth")
const baseUrl = "/api/staff"



router.get(baseUrl,requireAuth, staffController.getAllStaffList)
router.get(`${baseUrl}/:id`,requireAuth, staffController.getSingleStaff)
router.post(`${baseUrl}`, requireAuth, staffController.staffRegisterInfo)
router.post(`${baseUrl}/auth/login`, staffController.login)
router.put(`${baseUrl}`, requireAuth, staffController.updateStaffInfo)
router.post(`${baseUrl}/setpassword`, staffController.setPassword)
router.delete(`${baseUrl}/:id`,requireAuth, staffController.deleteStaffInfo)
router.post(`${baseUrl}_refresh_token`, staffController.refreshToken)



module.exports = router