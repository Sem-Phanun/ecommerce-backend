const express = require("express")
const router = express.Router()
const cart = require('../controllers/cartController')
const baseUrl = "/api/cart"
router.get(`${baseUrl}/:id`,cart.getByCustomer);
router.post(`${baseUrl}`, cart.addCart)
router.put(`${baseUrl}`,cart.updateCart)
router.delete(`${baseUrl}/:id`,cart.removeCart)


module.exports = router;