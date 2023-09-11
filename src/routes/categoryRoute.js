const express = require("express")
const router = express.Router()
const category = require("../controllers/categoryController");
const baseUrl = "/api/category";


router.get(`${baseUrl}`,category.getAllCategory)
router.get(`${baseUrl}/:id`,category.getOne)
router.post(`${baseUrl}`, category.createCategory)
router.put(`${baseUrl}`,category.updateCategory)
router.delete(`${baseUrl}`,category.removeCategory)

module.exports = router;
