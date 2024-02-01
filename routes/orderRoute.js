import express from"express"

import orderController from'../controllers/orderController.js'
import { requestAuth } from"../helper/auth.js"

const router = express.Router()

router.get("/order-list", requestAuth, orderController.getAllOrderList)
router.get("/order/:id", requestAuth, orderController.getSignleOrder)
router.post("/create-order", requestAuth , orderController.createOrder)
router.put("/update-order", requestAuth ,orderController.updateOrder)
router.delete("/delete-order" , requestAuth , orderController.deleteOrder)

module.exports = router;