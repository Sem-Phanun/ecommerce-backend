import express from "express"
import { getAllwishlist, createWishlist, removeWishlist } from '../controller/wishlistController.js'
import { requestAuth } from "../middleware/auth.js"

const router = express.Router()

router.get("/wishlist" , requestAuth, getAllwishlist)
router.post("/create/wishlist", requestAuth , createWishlist)
router.delete("/remove-wishlist/:id" , requestAuth, removeWishlist)

export default router