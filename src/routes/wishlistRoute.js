const wishlistController = require('../controllers/wishlistController')
const base_route = '/api/wishlist'
const wishlist = (app) => {
    app.get(`${base_route}`,wishlistController.getAllwishlist)
    // app.get(`${base_route}/:id`,wishlistController.getSingleWishlist)
    app.post(`${base_route}`,wishlistController.createWishlist)
    // app.put(`${base_route}`,wishlistController.updateWishlist)
    app.delete(`${base_route}/:id`,wishlistController.removeWishlist)
}

module.exports = wishlist