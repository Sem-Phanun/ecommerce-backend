import express from 'express'
import productController from '../controllers/productController.js'

import { requestAuth } from "../middleware/auth.js"
import { upload } from "../helper/services"

const router = express.Router()

router.get("/get-all-product",productController.getAllProduct)
router.get("/get-single-product/:id",productController.getSingleProduct)
router.post("/create-product", requestAuth ,upload.single("images"),productController.createProduct)
router.put("/update-product",requestAuth, productController.updateProduct)
router.delete("/delete-product/:id", requestAuth, productController.removeProduct)
router.put("/change_status",requestAuth, productController.changeStatus)

module.exports = router;