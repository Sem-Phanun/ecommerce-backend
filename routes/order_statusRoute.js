import express from "express"
import { getAll, create, remove} from '../controller/order_statusController.js'
import { requestAuth } from "../middleware/auth.js"

const router = express.Router()

router.get("/order-status", requestAuth ,getAll)
router.post("/order-status", requestAuth ,create)
router.delete("/order-status/:id", requestAuth,remove)

export default router