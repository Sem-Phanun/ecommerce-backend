const express = require("express")
const router = express.Router()
const customer = require("../controllers/customerController");
const { requireAuth } = require("../helper/auth")
const baseUrl = "/api/customer";

router.get(baseUrl, requireAuth, customer.getCustomerList);
router.get(`${baseUrl}/:id`, customer.getSingleCustomer);
router.post(`${baseUrl}`,customer.registerAndCreateAddress);
router.post(`${baseUrl}/auth/login`,requireAuth, customer.login)
router.put(`${baseUrl}`, customer.updateCustomer);
router.delete(`${baseUrl}/:id`,customer.removeCustomer);

router.get(`${baseUrl}_address`, customer.addressList);
router.get(`${baseUrl}_address/:id`, customer.getOneAddress);
router.post(`${baseUrl}_address`, customer.addNewAddress);
router.put(`${baseUrl}_address`, customer.updateAddress);
router.delete(`${baseUrl}_address/:id`, customer.removeAddress);


module.exports = router;
