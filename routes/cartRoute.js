import express from "express"
import cart from '../controllers/cartController'
import { requestAuth } from "../helper/auth"
const router = express.Router()


router.get("/get-cart-by-customer/:id", requestAuth ,cart.getByCustomer);
router.post("/add-cart", requestAuth, cart.addCart)
router.put("/update-cart", requestAuth ,cart.updateCart)
router.delete("/delete-cart/:id", requestAuth,cart.removeCart)


module.exports = router;