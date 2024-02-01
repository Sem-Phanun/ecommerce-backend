import express from "express"
import wishlistController from '../controllers/wishlistController'
import { requestAuth } from "../helper/auth"

const router = express.Router()

router.get("/wishlist" , requestAuth,wishlistController.getAllwishlist)
router.post("/create/wishlist", requestAuth ,wishlistController.createWishlist)
router.delete("/remove-wishlist/:id" , requestAuth,wishlistController.removeWishlist)

module.exports = router