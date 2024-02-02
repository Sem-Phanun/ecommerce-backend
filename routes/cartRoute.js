import express from "express";
import {
  getByCustomer,
  addCart,
  updateCart,
  removeCart,
} from "../controller/cartController.js";
import { requestAuth } from "../middleware/auth.js";
const router = express.Router();

router.get("/get-cart-by-customer/:id", requestAuth, getByCustomer);
router.post("/add-cart", requestAuth, addCart);
router.put("/update-cart", requestAuth, updateCart);
router.delete("/delete-cart/:id", requestAuth, removeCart);

export default router;
