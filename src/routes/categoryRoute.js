const express = require("express")
const router = express.Router()
const category = require("../controllers/categoryController");
const { requestAuth } = require("../helper/auth");
const baseUrl = "/api/category";


router.get(`${baseUrl}`, requestAuth ,category.getAllCategory)
router.get(`${baseUrl}/:id`, requestAuth,category.getOne)
router.post(`${baseUrl}`,requestAuth, category.createCategory)
router.put(`${baseUrl}`,requestAuth ,category.updateCategory)
router.delete(`${baseUrl}` , requestAuth,category.removeCategory)

module.exports = router;
