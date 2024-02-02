import express from "express"
import { getAllCategory, getOne, createCategory, updateCategory, removeCategory } from "../controller/categoryController.js";
import { requestAuth } from "../middleware/auth.js";

const router = express.Router()

router.get("/get-category", requestAuth, getAllCategory)
router.get("/get-category/:id", requestAuth, getOne)
router.post("/create-category",requestAuth,  createCategory)
router.put("/update-cateogry",requestAuth , updateCategory)
router.delete("/delete/:id" , requestAuth, removeCategory)

module.exports = router;
