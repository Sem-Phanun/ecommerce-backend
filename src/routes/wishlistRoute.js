const express = require("express")
const router = express.Router()
const wishlistController = require('../controllers/wishlistController')

const baseUrl = '/api/wishlist'

router.get(`${baseUrl}`,wishlistController.getAllwishlist)
router.post(`${baseUrl}`,wishlistController.createWishlist)
router.delete(`${baseUrl}/:id`,wishlistController.removeWishlist)

module.exports = router