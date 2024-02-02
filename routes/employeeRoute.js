import express from "express";
import {
  getAllEmployeeList,
  getSingleEmployee,
  employeeRegisterInfo,
  login,
  updateEmployeeInfo,
  deleteEmployeeInfo,
  setPassword,
  refreshToken
} from "../controller/employeeController.js";
import { requestAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/get-employee", requestAuth, getAllEmployeeList);
router.get("/get-employee-by-id/:id", requestAuth, getSingleEmployee);
router.post("/register", employeeRegisterInfo);
router.post("/auth/login", login);
router.put("/update", requestAuth, updateEmployeeInfo);
router.post("/setpassword", setPassword);
router.delete("/delete/:id", requestAuth, deleteEmployeeInfo);
router.post("/_refresh_token", refreshToken);

export default router
