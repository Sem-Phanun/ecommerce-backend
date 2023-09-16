const express = require("express")
const router = express.Router()
const customer = require("../controllers/customerController");
const { requestAuth } = require("../helper/auth")
const baseUrl = "/api/customer";

router.get(`${baseUrl}`,requestAuth("customer.Read"), customer.getCustomerList);
router.get(`${baseUrl}/:id`,requestAuth("customer.Read"), customer.getSingleCustomer);
router.post(`${baseUrl}` , requestAuth("customer.Create"),customer.registerAndCreateAddress);
router.post(`${baseUrl}/auth/login`,requestAuth, customer.login)
router.put(`${baseUrl}`, requestAuth, customer.updateCustomer);
router.delete(`${baseUrl}/:id`, requestAuth ,customer.removeCustomer);

router.get(`${baseUrl}_address`, requestAuth ,customer.addressList);
router.get(`${baseUrl}_address/:id`, requestAuth, customer.getOneAddress);
router.post(`${baseUrl}_address`, requestAuth, customer.addNewAddress);
router.put(`${baseUrl}_address`,requestAuth, customer.updateAddress);
router.delete(`${baseUrl}_address/:id`, requestAuth, customer.removeAddress);


module.exports = router;
