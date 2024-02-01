import express from "express"
import category from "../controllers/categoryController.js";
import { requestAuth } from "../middleware/auth.js";

const router = express.Router()

router.get("/get-category", requestAuth,category.getAllCategory)
router.get("/get-category/:id", requestAuth,category.getOne)
router.post("/create-category",requestAuth, category.createCategory)
router.put("/update-cateogry",requestAuth ,category.updateCategory)
router.delete("/delete/:id" , requestAuth,category.removeCategory)

module.exports = router;
