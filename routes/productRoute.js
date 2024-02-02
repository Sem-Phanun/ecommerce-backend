import express from 'express'
import { getAllProduct, getSingleProduct, createProduct, updateProduct, removeProduct, changeStatus } from '../controller/productController.js'
import { requestAuth } from "../middleware/auth.js"
import { upload } from "../helper/services.js"

const router = express.Router()

router.get("/get-all-product",getAllProduct)
router.get("/get-single-product/:id",getSingleProduct)
router.post("/create-product", requestAuth ,upload.single("images"),createProduct)
router.put("/update-product",requestAuth, updateProduct)
router.delete("/delete-product/:id", requestAuth, removeProduct)
router.put("/change_status",requestAuth, changeStatus)

export default router