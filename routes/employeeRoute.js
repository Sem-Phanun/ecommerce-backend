import express from "express"
import employeeController from '../controllers/employeeController'
import { requestAuth } from "../helper/auth"

const router = express.Router();

router.get("/get-employee", requestAuth , employeeController.getAllStaffList)
router.get("/get-employee-by-id/:id",requestAuth, employeeController.getSingleStaff)
router.post("/register", employeeController.staffRegisterInfo)
router.post("/auth/login", employeeController.login)
router.put("/update", requestAuth, employeeController.updateStaffInfo)
router.post("/setpassword", employeeController.setPassword)
router.delete("/delete/:id",requestAuth, employeeController.deleteStaffInfo)
router.post("/_refresh_token", employeeController.refreshToken)



module.exports = router