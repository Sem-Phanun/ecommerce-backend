const express = require("express")
const router = express.Router()
const wishlistController = require('../controllers/wishlistController')
const { requestAuth } = require("../helper/auth")

const baseUrl = '/api/wishlist'

router.get(`${baseUrl}` , requestAuth,wishlistController.getAllwishlist)
router.post(`${baseUrl}`, requestAuth ,wishlistController.createWishlist)
router.delete(`${baseUrl}/:id` , requestAuth,wishlistController.removeWishlist)

module.exports = router