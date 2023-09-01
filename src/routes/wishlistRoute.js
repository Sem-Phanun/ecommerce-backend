const wishlistController = require('../controllers/wishlistController')
// const userGuard = require("../controllers/authController")
const base_route = '/api/wishlist'
const wishlist = (app) => {
    app.get(`${base_route}`,wishlistController.getAllwishlist)
    app.post(`${base_route}`,wishlistController.createWishlist)
    app.delete(`${base_route}/:id`,wishlistController.removeWishlist)
}

module.exports = wishlist