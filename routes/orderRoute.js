import express from"express"
import { getAllOrderList, getSignleOrder, createOrder, updateOrder, deleteOrder} from'../controller/orderController.js'
import { requestAuth } from"../middleware/auth.js"

const router = express.Router()

router.get("/order-list", requestAuth, getAllOrderList)
router.get("/order/:id", requestAuth, getSignleOrder)
router.post("/create-order", requestAuth , createOrder)
router.put("/update-order", requestAuth ,updateOrder)
router.delete("/delete-order" , requestAuth , deleteOrder)

export default router