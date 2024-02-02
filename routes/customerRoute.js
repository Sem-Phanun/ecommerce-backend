import express from "express";
import {
  getCustomerList,
  getSingleCustomer,
  getOneAddress,
  registerAndCreateAddress,
  login,
  updateAddress,
  removeAddress,
  addNewAddress,
  addressList,
  updateCustomer,
  removeCustomer
} from "../controller/customerController.js";
import { requestAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/customer-list", requestAuth("customer.Read"), getCustomerList);
router.get(
  "/customer-list/:id",
  requestAuth("customer.Read"),
  getSingleCustomer
);
router.post(
  "/create/customer",
  requestAuth("customer.Create"),
  registerAndCreateAddress
);
router.post("/auth/login", requestAuth, login);
router.put("/update/customer", requestAuth, updateCustomer);
router.delete("/delete-customer/:id", requestAuth, removeCustomer);

router.get("/get_address", requestAuth, addressList);
router.get("/get_address/:id", requestAuth, getOneAddress);
router.post("/create_address", requestAuth, addNewAddress);
router.put("/update_address", requestAuth, updateAddress);
router.delete("/delete_address/:id", requestAuth, removeAddress);

export default router;
