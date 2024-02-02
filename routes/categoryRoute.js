import express from "express"
import { getAllCategory, getOne, createCategory, updateCategory, removeCategory } from "../controller/categoryController.js";
import { requestAuth } from "../middleware/auth.js";

const router = express.Router()

router.get("/get-category", getAllCategory)
router.get("/get-category/:id", requestAuth, getOne)
router.post("/create-category", createCategory)
router.put("/update-cateogry",requestAuth , updateCategory)
router.delete("/delete/:id" , requestAuth, removeCategory)

export default router;
